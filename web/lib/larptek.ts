import { Connection, PublicKey, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';

export const LARPTEK_PROGRAM_ID = 'LarptEk111111111111111111111111111111111111';
const DEVNET_RPC = 'https://api.devnet.solana.com';

const connection = new Connection(DEVNET_RPC, 'confirmed');

function hexToBytes(hex: string): Uint8Array {
  const clean = hex.replace(/^0x/, '').toLowerCase();
  if (clean.length !== 64) throw new Error('hash must be 32 bytes hex');
  const out = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    out[i] = parseInt(clean.substr(i * 2, 2), 16);
  }
  return out;
}

function bytesToHex(b: Uint8Array): string {
  return Array.from(b).map((x) => x.toString(16).padStart(2, '0')).join('');
}

export async function deriveIdentityPda(user: PublicKey): Promise<[PublicKey, number]> {
  const seed = new TextEncoder().encode('identity');
  return await PublicKey.findProgramAddress([seed, user.toBuffer()], new PublicKey(LARPTEK_PROGRAM_ID));
}

async function anchorIxDiscriminator(name: string): Promise<Uint8Array> {
  const text = `global:${name}`;
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text) as any);
  return new Uint8Array(digest).slice(0, 8);
}

export async function registerIdentity(address: string, hashHex: string) {
  const provider: any = (globalThis as any).solana;
  if (!provider?.isPhantom) throw new Error('Wallet provider not found');
  const userPk = new PublicKey(address);
  const programId = new PublicKey(LARPTEK_PROGRAM_ID);
  const [pda] = await deriveIdentityPda(userPk);
  const disc = await anchorIxDiscriminator('register_identity');
  const hash = hexToBytes(hashHex);

  const data = Buffer.concat([disc, hash]);

  const ix = new TransactionInstruction({
    programId,
    keys: [
      { pubkey: userPk, isSigner: true, isWritable: true },
      { pubkey: pda, isSigner: false, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data,
  });

  const { blockhash } = await connection.getLatestBlockhash('finalized');
  const tx = new Transaction({ feePayer: userPk, recentBlockhash: blockhash }).add(ix);
  const signed = await provider.signTransaction(tx);
  const sig = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(sig, 'confirmed');
  return sig;
}

export async function verifyIdentity(address: string): Promise<{ found: boolean; hash?: string; timestamp?: string }> {
  const userPk = new PublicKey(address);
  const [pda] = await deriveIdentityPda(userPk);
  const info = await connection.getAccountInfo(pda);
  if (!info) return { found: false };
  const buf = info.data;
  if (buf.length < 8 + 32 + 32 + 8 + 1) return { found: false };
  const offset = 8; // skip Anchor account discriminator
  const hash = buf.slice(offset + 32, offset + 64);
  const tsView = new DataView(buf.buffer, buf.byteOffset + offset + 64, 8);
  const created = Number(tsView.getBigInt64(0, true));
  const initialized = buf[offset + 72] === 1;
  if (!initialized) return { found: false };
  return {
    found: true,
    hash: `${bytesToHex(new Uint8Array(hash)).slice(0, 10)}...${bytesToHex(new Uint8Array(hash)).slice(-8)}`,
    timestamp: new Date(created * 1000).toISOString(),
  };
}
