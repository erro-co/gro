"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Index page
      <button onClick={handleSignOut}>sign out</button>
    </main>
  );
}
