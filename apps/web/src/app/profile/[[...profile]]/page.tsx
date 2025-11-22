import { UserProfile, SignOutButton } from "@clerk/nextjs";


export default function ProfilePage() {
  return (
    <main className="min-h-screen w-full flex justify-center items-start py-12">
      <div className="w-full max-w-6xl">
        <UserProfile/>
        <div className="flex justify-end">
          <SignOutButton>
            <button className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: "#9CAF88" }}>
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>
    </main>
  )
}

