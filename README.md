# LARPTEK — Solana Pseudonymous Identity Layer

Be anyone. Stay real.

This repo contains:

- web: Next.js + Tailwind frontend (wallet adapter, hashing, pages)
- anchor: Minimal Anchor program `larptek_identity` (PDA storage, register/verify)

## Quickstart

Prereqs: Node 18+, pnpm or npm, Rust, Solana CLI, Anchor CLI.

### 1) Web

```bash
cd web
pnpm i # or npm i
pnpm dev # or npm run dev
```

- Open http://localhost:3000
- Connect wallet (Phantom, etc.)
- Generate local hash and register (placeholder call until program is deployed)

### 2) Anchor program

```bash
cd anchor
anchor build
anchor keys list
anchor test # optional
```

Update `programId` in `web/lib/larptek.ts` after deployment.

## Structure

- web/app
  - page.tsx (Home)
  - create/page.tsx (Create ID)
  - verify/page.tsx (Verify)
- web/components/WalletProvider.tsx (Wallet Adapter wiring)
- web/lib/larptek.ts (Program client placeholders)
- anchor/programs/larptek_identity/src/lib.rs (Program)

## Program spec

- PDA seeds: ["identity", user_pubkey]
- Data: wallet_pubkey, hash [32], created_at i64
- Instructions: register_identity, verify_identity, (optional) update_identity

## Notes

- Frontend hashing uses crypto.subtle(SHA-256) of `${pubkey}|${entropy}|${userAgent}`
- One hash per wallet is enforced on-chain (PDA must be uninitialized for register)

