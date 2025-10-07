'use client';
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--pink)]">
      <SignIn
        appearance={{
          elements: {
            headerTitle: "text-3xl font-serif text-[var(--sage)]", // style title
            headerSubtitle: "text-gray-700 font-serif",
            formButtonPrimary:
              "bg-[var(--sage)] text-white font-serif hover:opacity-90",
          },
          variables: {
            colorPrimary: "#A8BBA0",
          },
        }}
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
