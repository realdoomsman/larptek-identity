'use client';

import { useCallback, useMemo, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { registerIdentity } from '@/lib/larptek';
import { LARPTEK_PROGRAM_ID } from '@/lib/larptek';

export default function CreateIdPage() {
  const { publicKey, connected, signTransaction } = useWallet();
  const [localEntropy, setLocalEntropy] = useState<string>('');
  const [hashHex, setHashHex] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'hashing' | 'ready' | 'registering' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string>('');
  const [txSig, setTxSig] = useState<string | null>(null);

  const generateHash = useCallback(async () => {
    if (!connected || !publicKey) return;
    setStatus('hashing');
    try {
      const entropy = Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      setLocalEntropy(entropy);
      const combined = `${publicKey.toBase58()}-${entropy}-${navigator.userAgent}`;
      const encoder = new TextEncoder();
      const data = encoder.encode(combined);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data as any);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHashHex(hashHex);
      setStatus('ready');
    } catch (e) {
      setError('Failed to generate hash');
      setStatus('error');
    }
  }, [connected, publicKey]);

  useEffect(() => {
    if (connected && publicKey) {
      generateHash();
    } else {
      setStatus('idle');
      setHashHex('');
      setLocalEntropy('');
    }
  }, [connected, publicKey, generateHash]);

  const handleRegister = async () => {
    if (!connected || !publicKey || !signTransaction || status !== 'ready') {
      setError('Wallet not connected or hash not ready');
      return;
    }
    setStatus('registering');
    setError('');
    try {
      const signature = await registerIdentity(publicKey.toBase58(), hashHex);
      setTxSig(signature);
      setStatus('done');
    } catch (e: any) {
      setError(e.message || 'Failed to register');
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Create Your LARPTEK ID</h1>
          <p className="mt-4 text-gray-300">
            Generate a pseudonymous identity on Solana. No personal data required.
          </p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-2 font-mono">WALLET STATUS</div>
              <div className="flex items-center gap-3">
                <span className={`inline-block h-3 w-3 rounded-full ${connected ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                <span className="text-sm font-semibold">
                  {connected ? `Connected: ${publicKey?.toBase58().slice(0, 6)}…${publicKey?.toBase58().slice(-4)}` : 'Not connected'}
                </span>
              </div>
            </div>

            {!connected ? (
              <div className="text-center py-8">
                <p className="text-gray-300 mb-4">Connect your wallet to continue</p>
                <div className="flex justify-center">
                  <WalletMultiButton className="!bg-cyan-500 hover:!bg-cyan-400 !rounded-xl !px-6 !py-3 !text-sm !font-semibold" />
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="text-sm text-gray-400 mb-2 font-mono">GENERATED HASH</div>
                  <div className="font-mono text-xs text-cyan-300 bg-black/40 rounded-xl px-4 py-3 truncate">
                    {status === 'hashing' ? 'Generating...' : hashHex || 'No hash'}
                  </div>
                </div>

                {status === 'done' ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2.5 text-sm text-emerald-300">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                      ID Registered
                    </div>
                    {txSig && (
                      <div className="mt-4">
                        <a
                          href={`https://solscan.io/tx/${txSig}?cluster=devnet`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-gray-300 hover:text-cyan-300 transition-colors"
                        >
                          View transaction
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <button onClick={handleRegister} disabled={status !== 'ready'} className="inline-flex items-center justify-center rounded-xl border border-cyan-400/30 px-6 py-3 text-sm font-semibold text-cyan-300 transition-all duration-200 hover:bg-cyan-400/10 hover:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50">
                      {status === 'registering' ? 'Registering...' : status === 'ready' ? 'Register on-chain' : 'Waiting...'}
                    </button>
                  </div>
                )}

                {status === 'error' && (
                  <div className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="text-sm text-gray-400 mb-3 font-mono">PROGRAM DETAILS</div>
            <div className="space-y-2 text-sm text-gray-300">
              <div>Program ID: <span className="font-mono text-cyan-300">{LARPTEK_PROGRAM_ID}</span></div>
              <div>Network: Solana Devnet</div>
              <div>One ID per wallet, stored in a PDA.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
