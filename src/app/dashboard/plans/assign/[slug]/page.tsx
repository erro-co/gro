import AssignUserToPlan from "@/components/Pages/MealPlanPages/TrainerViewMealPlanPages/CreatePlanPage/AssignUserToPlan";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gro - Assign User",
  icons: {
    icon: "/gro_logo.png",
  },
};

const AssignUserToPlanPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/login` route.
    redirect("/login");
  }
  return <AssignUserToPlan />;
};

export default AssignUserToPlanPage;
