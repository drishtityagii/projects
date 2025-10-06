import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
    const { userId } = await auth();
    return (
        <main className="p-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="mt-2 text-sm text-gray-500">Signed in as: {userId}</p>
        </main>
    );
}