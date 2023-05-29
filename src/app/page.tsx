"use client";
import { supabase } from "@/lib/supabase";

export const metadata = {
  icons: {
    icon: "/gro_logo.png",
  },
};

export default function Home() {
  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error signing out:", error.message);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Index page
      <button onClick={handleSignOut}>sign out</button>
    </main>
  );
}
