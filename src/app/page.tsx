"use client";
import GroLogo from "@/components/icons/Logo";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-40 bg-gro-pink rounded-lg">
        <GroLogo />
      </div>

      <div>
        <Link href="/dashboard/plans">
          <div className="bg-gro-purple p-4 text-white rounded-lg">
            Go to Dashboard
          </div>
        </Link>
      </div>
      <button
        onClick={handleSignOut}
        className="p-2 bg-red-500 text-white text-xl rounded-md"
      >
        Sign out
      </button>
    </main>
  );
}
