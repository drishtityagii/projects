'use client';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <>
      {/* Top bar */}
      <header className="w-full bg-[var(--sage)] text-white">
        <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
          <span className="text-xl font-serif">Layers</span>
          <div>
            <SignedOut>
              <Link
                href="/sign-in"
                className="inline-flex items-center rounded-2xl bg-white/15 px-4 py-1.5 hover:bg-white/25"
              >
                Sign in
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Content — no more white box */}
      <main className="mx-auto max-w-5xl px-4 mt-20 text-center">
        <h1 className="text-5xl font-serif mb-4 text-gray-800">Welcome</h1>
        <p className="text-lg text-gray-700 mb-8">
          Login to access your dashboard.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/sign-in"
            className="inline-flex items-center rounded-2xl bg-[var(--sage)] px-6 py-2.5 text-white text-lg transition hover:opacity-90 active:opacity-85"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="inline-flex items-center rounded-2xl bg-[var(--sage)] px-6 py-2.5 text-white text-lg transition hover:opacity-90 active:opacity-85"
          >
            Create account
          </Link>
        </div>
      </main>
    </>
  );
}