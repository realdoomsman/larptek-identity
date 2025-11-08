# LARPTEK - Private Proof of Personhood on Solana

> Be anyone. Stay real.

A pseudonymous identity protocol on Solana that lets you prove you're real without revealing who you are.

🔗 **Live Demo**: [larptek-identity](https://github.com/realdoomsman/larptek-identity)

## Features

- 🔐 **Private by design** - Create on-chain IDs without email, KYC, or personal info
- ✅ **Simple verification** - Anyone can check if a wallet has a LARPTEK ID
- ⚡ **Built for Solana** - Fast, low-cost, cryptographic proof via PDAs
- 🎨 **Modern UI** - Next.js 14 + Tailwind CSS + Wallet Adapter

## Project Structure

```
larptek/
├── web/                    # Next.js frontend
│   ├── app/               # Pages (Home, Create, Verify)
│   ├── components/        # WalletProvider
│   └── lib/              # Solana program client
└── anchor/                # Anchor Solana program
    └── programs/
        └── larptek_identity/
            └── src/lib.rs # Identity registry program
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm
- Rust & Solana CLI (for program development)
- Anchor CLI (for program development)

### Running the Web App

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Building the Anchor Program

```bash
cd anchor
anchor build
anchor keys list
anchor test
```

Update `LARPTEK_PROGRAM_ID` in `web/lib/larptek.ts` after deployment.

## How It Works

1. **Connect Wallet** - Use Phantom or any Solana wallet on devnet
2. **Generate Hash** - Local SHA-256 hash from public key + entropy + user agent
3. **Register On-Chain** - Write your hash to the LARPTEK registry program
4. **Verify** - Anyone can check if a wallet has a registered ID

## Program Specification

- **PDA Seeds**: `["identity", user_pubkey]`
- **Account Data**: 
  - Wallet pubkey (32 bytes)
  - Hash (32 bytes)
  - Created timestamp (8 bytes)
- **Instructions**: 
  - `register_identity` - Register new ID (one per wallet)
  - `verify_identity` - Check if wallet has ID

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Solana**: Anchor, @solana/web3.js, Wallet Adapter
- **Styling**: Custom design system with cyan/purple gradients
- **Fonts**: Inter + Space Mono (Google Fonts)

## Development Notes

- Frontend hashing uses `crypto.subtle.digest('SHA-256')` of `${pubkey}-${entropy}-${userAgent}`
- One hash per wallet enforced on-chain (PDA initialization check)
- Currently configured for Solana Devnet
- Wallet adapter supports Phantom and other standard Solana wallets

## License

MIT

## Contributing

Issues and PRs welcome!

---

Built with ⚡ on Solana
