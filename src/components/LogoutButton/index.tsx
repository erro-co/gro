"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    router.refresh();
  };

  return (
    <button
      className="flex ml-auto rounded-md no-underline bg-btn-background hover:bg-btn-background-hover bg-gro-indigo px-4 py-2 text-white"
      onClick={signOut}
    >
      Logout
    </button>
  );
}
