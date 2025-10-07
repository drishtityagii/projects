'use client';
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[var(--pink)] flex flex-col">
      {/* 🌿 Sage green top bar */}
      <header className="w-full bg-[var(--sage)] text-white">
        <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <span className="text-xl font-serif">Layers</span>
        <Link href="/" className="text-white/90 hover:opacity-80 font-serif">
          Home
        </Link>
        </div>
      </header>

      {/* Clerk Sign-in */}
      <main className="flex-grow flex items-center justify-center">
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </main>
    </div>
  );
}
