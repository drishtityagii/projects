'use client';
import Header from "../../../components/header/Header";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
      <div className="min-h-screen bg-[var(--pink)] flex flex-col">
        <Header />
        <main className="flex min-h-screen items-center justify-center">
            <SignUp />
        </main>
      </div>
    );
}