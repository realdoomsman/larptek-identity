import './globals.css';
import type { Metadata } from 'next';
import { WalletProviderClient } from '@/components/WalletProvider';

export const metadata: Metadata = {
  title: 'LARPTEK - Identity for the Synthetic Internet',
  description: 'Prove you are real - without revealing who you are.',
  manifest: '/manifest.json',
  icons: { 
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'LARPTEK - Private Proof of Personhood on Solana',
    description: 'Get a pseudonymous ID on Solana to show you are a real human - without sharing personal data.',
    url: 'https://larptek.work',
    siteName: 'LARPTEK',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white">
        <WalletProviderClient>
          <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-md">
            <div className="mx-auto max-w-6xl px-6 flex items-center justify-between py-4">
              <a href="/" className="text-lg font-bold tracking-tight text-white">
                LARPTEK
              </a>
              <nav className="flex items-center gap-6 text-sm">
                <a href="/create" className="text-gray-300 hover:text-white transition-colors">Create</a>
                <a href="/verify" className="text-gray-300 hover:text-white transition-colors">Verify</a>
              </nav>
            </div>
          </header>
          {children}
        </WalletProviderClient>
      </body>
    </html>
  );
}
