'use client';

import { useCallback, useState } from 'react';
import { verifyIdentity } from '@/lib/larptek';

export default function VerifyPage() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ found: boolean; hash?: string; timestamp?: string } | null>(null);
  const [error, setError] = useState<string>('');

  const check = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      const res = await verifyIdentity(address);
      setResult(res);
    } catch (e: any) {
      setError('Lookup failed');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [address]);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Verify LARPTEK ID</h1>
          <p className="mt-4 text-gray-300">Public tool to check if a Solana address has a LARPTEK ID.</p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <label className="text-sm text-gray-400 font-mono">SOLANA ADDRESS</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter a public key…"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20"
            />
            <div className="mt-4">
              <button
                onClick={check}
                disabled={address.length < 32 || loading}
                className="inline-flex items-center justify-center rounded-xl border border-cyan-400/30 px-6 py-3 text-sm font-semibold text-cyan-300 transition-all duration-200 hover:bg-cyan-400/10 hover:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50"
              >
                {loading ? 'Checking…' : 'Check Registry'}
              </button>
            </div>

            {result && result.found && (
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                  LARPTEK ID found
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                  <div className="text-sm text-gray-400">Hash</div>
                  <div className="mt-1 font-mono text-xs text-cyan-300">{result.hash}</div>
                </div>
                {result.timestamp && (
                  <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                    <div className="text-sm text-gray-400">Registered</div>
                    <div className="mt-1 text-xs text-gray-300">{result.timestamp}</div>
                  </div>
                )}
              </div>
            )}

            {result && !result.found && (
              <div className="mt-6 rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-300">
                No LARPTEK ID found for this address.
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
