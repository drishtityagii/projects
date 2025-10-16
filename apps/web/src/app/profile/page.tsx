import { UserProfile } from "@clerk/nextjs";


export default function ProfilePage() {
  return (
    <main className="min-h-screen w-full flex justify-center items-start py-12">
      <div className="w-full max-w-6xl">
        <UserProfile
          appearance={{
            // elements: {
          //   },
          }}
        />
      </div>
    </main>
  )
}

