import { currentUser } from "@clerk/nextjs/server";
import Header from "../../components/Header";

export default async function Dashboard() {
  const user = await currentUser();
  const firstName = user?.firstName || "there";

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[80vh] text-center bg-[var(--pink-light)]">
        <h1 className="text-3xl font-semibold text-gray-900">
          Welcome, {firstName}!
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Signed in as: {user?.emailAddresses?.[0]?.emailAddress}
        </p>
      </main>
    </>
  );
}

