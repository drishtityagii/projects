"use client";

import Header from "../../components/Header";
import ChatBox from "../../components/Chatbox";

type DashboardClientProps = {
  firstName: string;
  email: string;
};

export default function DashboardClient({ firstName, email }: DashboardClientProps) {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[80vh] text-center bg-[var(--pink-light)]">
        <h1 className="text-3xl font-semibold text-gray-900">
          Welcome, {firstName}!
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Signed in as: {email}
        </p>

        {/* Chatbox centered under welcome */}
        <div className="mt-6 w-full flex justify-center">
          <ChatBox />
        </div>
      </main>
    </>
  );
}
