import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gro - Dashboard",
  icons: {
    icon: "/gro_logo.png",
  },
};

const DashboardHomePage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/login` route.
    redirect("/login");
  }
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
    </div>
  );
};

export default DashboardHomePage;
