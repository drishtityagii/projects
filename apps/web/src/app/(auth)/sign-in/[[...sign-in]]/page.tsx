'use client';
import Header from "../../../../components/header/Header";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
   <div className="min-h-screen bg-[var(--pink)] flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16">
      <SignIn
      path="/sign-in" routing="path" signUpUrl="/sign-up"
      afterSignInUrl="/dashboard" redirectUrl="/dashboard"
      />
      </main>
    </div>
  );
}
