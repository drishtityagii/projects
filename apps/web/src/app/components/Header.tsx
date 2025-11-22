"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="w-full bg-[var(--sage)] text-white">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <span className="text-xl">Layers</span>
        {isSignedIn ? (
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="rounded-md border border-white/40 px-3 py-1 text-sm hover:bg-white/20 transition"
            >
              Profile
            </Link>
 
          </div>
        ) : (
          <div />
        )}
      </div>
    </header>
  );
}