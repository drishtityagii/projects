'use client';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <header className="h-14 flex items-center justify-between border-b mb-6">
        <span className="font-semibold">SkinRoutine</span>
        <div>
          <SignedOut><Link href="/sign-in" className="underline">Sign in</Link></SignedOut>
          <SignedIn><UserButton afterSignOutUrl="/" /></SignedIn>
        </div>
      </header>

      <h1 className="text-3xl font-bold mb-2">Welcome</h1>
      <p className="text-gray-600">Login to access your dashboard.</p>
      <div className="mt-4 space-x-4">
        <Link className="underline" href="/sign-in">Sign in</Link>
        <Link className="underline" href="/sign-up">Create account</Link>
      </div>
    </main>
  );
}
