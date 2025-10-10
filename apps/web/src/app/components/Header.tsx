"use client";

import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn, user } = useUser();

  return (
    <header className="w-full bg-[var(--sage)] text-white">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        {/* left side: logo */}
        <span className="text-xl font-serif">Layers</span>

        {/* right side: conditional */}
        {isSignedIn ? (
          <div className="flex items-center gap-3">
            {/* Option 1: simple button linking to /profile */}
            <Link
              href="/profile"
              className="rounded-md border border-white/40 px-3 py-1 text-sm hover:bg-white/20 transition"
            >
              Profile
            </Link>

            {/* Option 2: optional Clerk avatar dropdown (Sign out, etc.) */}
 
          </div>
        ) : (
          // if not signed in, keep it empty or add a sign-in button
          <div />
        )}
      </div>
    </header>
  );
}