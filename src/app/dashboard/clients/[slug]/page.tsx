import ClientProfilePage from "@/components/Pages/ClientPages/TrainerViewClientsPages/ClientProfilePage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Gro - Client",
  icons: {
    icon: "/gro_logo.png",
  },
};

export const dynamic = "force-dynamic";

const DisplayClientIndexPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/login` route.
    redirect("/login");
  }

  return <ClientProfilePage />;
};

export default DisplayClientIndexPage;
