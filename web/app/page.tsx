"use client";
import { useState, useEffect } from 'react';
import { TOKEN_ADDRESS, TWITTER_URL } from '@/lib/config';

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-32 text-center">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse" style={{ animationDuration: '4s' }}>
            Private Proof of Personhood
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Get a pseudonymous ID on Solana to show you’re a real human—without sharing personal data.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/create"
              className="inline-flex items-center justify-center rounded-xl border border-cyan-400/30 px-6 py-3 text-sm font-semibold text-cyan-300 transition-all duration-200 hover:bg-cyan-400/10 hover:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-black group relative"
              style={{ boxShadow: '0 0 24px rgba(34,211,238,0.12) inset, 0 0 16px rgba(34,211,238,0.16)' }}
            >
              <span className="absolute inset-0 rounded-xl bg-cyan-400/10 opacity-0 transition-opacity group-hover:opacity-100" />
              Get Your ID
            </a>
            <a
              href="/verify"
              className="inline-flex items-center justify-center rounded-xl border border-purple-400/30 px-6 py-3 text-sm font-semibold text-purple-300 transition-all duration-200 hover:bg-purple-400/10 hover:border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-black group relative"
              style={{ boxShadow: '0 0 24px rgba(168,85,247,0.12) inset, 0 0 16px rgba(168,85,247,0.16)' }}
            >
              <span className="absolute inset-0 rounded-xl bg-purple-400/10 opacity-0 transition-opacity group-hover:opacity-100" />
              Verify Address
            </a>
            <a
              href={TWITTER_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all duration-200 hover:bg-white/5 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black group relative"
              style={{ boxShadow: '0 0 24px rgba(255,255,255,0.06) inset, 0 0 12px rgba(255,255,255,0.08)' }}
            >
              <span className="absolute inset-0 rounded-xl bg-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
              Follow on Twitter
            </a>
          </div>

          <div className="mt-16 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-gray-300">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            Be anyone. Stay real.
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-10 text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Why LARPTEK</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-cyan-400/20 flex items-center justify-center">
                <span className="text-cyan-400 text-lg font-bold">1</span>
              </div>
              <h3 className="text-cyan-300 font-semibold">Private by design</h3>
            </div>
            <p className="text-sm text-gray-300">
              Create a unique on-chain ID without email, KYC, or personal info.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-purple-400/20 flex items-center justify-center">
                <span className="text-purple-400 text-lg font-bold">2</span>
              </div>
              <h3 className="text-purple-300 font-semibold">Simple to verify</h3>
            </div>
            <p className="text-sm text-gray-300">
              Anyone can check if a wallet has a LARPTEK ID—no extra data revealed.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-cyan-400/20 flex items-center justify-center">
                <span className="text-cyan-400 text-lg font-bold">3</span>
              </div>
              <h3 className="text-cyan-300 font-semibold">Built for Solana</h3>
            </div>
            <p className="text-sm text-gray-300">
              Fast, low-cost, and cryptographic. One ID per wallet via a PDA.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-10 text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">How it works</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="text-sm text-gray-400 mb-2 font-mono">STEP 01</div>
            <h3 className="text-lg font-semibold text-white mb-3">Connect your wallet</h3>
            <p className="text-sm text-gray-300">
              Use Phantom (or any supported wallet) on Solana devnet.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="text-sm text-gray-400 mb-2 font-mono">STEP 02</div>
            <h3 className="text-lg font-semibold text-white mb-3">Generate your ID</h3>
            <p className="text-sm text-gray-300">
              We create a local SHA-256 hash from your public key + local entropy.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="text-sm text-gray-400 mb-2 font-mono">STEP 03</div>
            <h3 className="text-lg font-semibold text-white mb-3">Register on-chain</h3>
            <p className="text-sm text-gray-300">
              Write your hash to the LARPTEK registry program. Publicly verifiable.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="text-sm text-gray-400 mb-2">LARPTEK Token</div>
            <h3 className="text-xl font-semibold text-white mb-4">Official contract address</h3>
            <div className="flex items-center gap-3">
              <div className="truncate rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-xs text-cyan-300 flex-1">
                {TOKEN_ADDRESS}
              </div>
              <button
                onClick={() => { navigator.clipboard.writeText(TOKEN_ADDRESS); setCopied(true); }}
                className="inline-flex items-center justify-center rounded-xl border border-cyan-400/30 px-6 py-3 text-sm font-semibold text-cyan-300 transition-all duration-200 hover:bg-cyan-400/10 hover:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-black flex-shrink-0"
              >
                Copy
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              This token will power fees, incentives, and governance for the identity network.
            </p>
          </div>

          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm bg-gradient-to-br from-cyan-500/8 via-purple-500/8 to-transparent hover:from-cyan-500/12 hover:via-purple-500/12 transition-all duration-500"
            style={{ boxShadow: '0 0 24px rgba(168,85,247,0.12) inset, 0 0 16px rgba(34,211,238,0.16)' }}
          >
            <div className="text-sm text-gray-400 mb-2">Stay in the loop</div>
            <h3 className="text-xl font-semibold text-white mb-4">Follow @larptek on Twitter</h3>
            <p className="text-sm text-gray-300 mb-5">
              Product releases, integration guides, and ecosystem updates.
            </p>
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white">
              Open Twitter
            </div>
            <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-2xl transition group-hover:bg-cyan-400/30" />
          </a>
        </div>
      </section>

      {copied && (
        <div className="fixed bottom-6 right-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300 animate-pulse [animation-duration:1s]">
          Copied to clipboard
        </div>
      )}

      <footer className="border-t border-[var(--border)] bg-black/40">
        <div className="container-max py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--text-secondary)]">
          <div>© 2025 LARPTEK INDUSTRIES — Synthetic Identity Systems</div>
          <div className="flex items-center gap-6">
            <a href="/create" className="hover:text-[var(--accent-cyan)] transition-colors">Get Your ID</a>
            <a href="/verify" className="hover:text-[var(--accent-purple)] transition-colors">Verify Address</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
