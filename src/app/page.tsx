import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import CountdownTimer from "@/components/Countdown";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center h-16">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 text-sm text-foreground">
          <div />

          <div>
            {user ? (
              <div className="flex items-center gap-4">
                <Link href={"/app"} className="border p-2 rounded">
                  Dashboard
                </Link>
                <LogoutButton />
              </div>
            ) : (
              <Link
                href="/login"
                className="py-2 px-5 rounded-md no-underline bg-gro-indigo text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <div>
        <CountdownTimer />
      </div>
    </div>
  );
}
