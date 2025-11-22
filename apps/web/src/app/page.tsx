'use client';
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Home() {
  return (
    <>
      <header className="w-full bg-[var(--sage)] text-white">
        <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
          <span className="text-xl">Layers</span>
          <div>
            <SignedOut>
              <Link
                href="/sign-in"
                className="items-center px-4 py-1.5 hover:bg-white/25"
              >
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
            </SignedIn>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 mt-20 text-center">
        <h1 className="text-5xl mb-4 text-gray-800">Welcome</h1>
        <p className="text-lg text-gray-700 mb-8">
          Login to access your dashboard.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/sign-in"
            className="inline-flex items-center rounded-2xl bg-[var(--sage)] px-6 py-2.5 text-white text-lg transition hover:opacity-90 active:opacity-85"
          >
            Sign In
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