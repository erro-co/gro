import EditPlanPage from "@/components/Pages/MealPlanPages/TrainerViewMealPlanPages/EditPlanPage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gro - Edit Plan",
  icons: {
    icon: "/gro_logo.png",
  },
};

const PlansEditIndexPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/login` route.
    redirect("/login");
  }
  return <EditPlanPage />;
};

export default PlansEditIndexPage;
