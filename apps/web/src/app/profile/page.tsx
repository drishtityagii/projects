import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <main className="min-h-screen w-full flex justify-center items-start bg-gradient-to-b from-white to-[#fff6f8] py-12">
      <div className="w-full max-w-6xl">
        <UserProfile />
      </div>
    </main>
  );
}

