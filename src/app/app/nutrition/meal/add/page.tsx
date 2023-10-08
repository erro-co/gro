import CreateTemplateMealPage from "@/components/Pages/NutritionPages/TrainerViewNutritionPages/CreateTemplateMeal";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gro - Add Meal Template",
  icons: {
    icon: "/gro_logo.png",
  },
};

const AddTemplateMealIndexPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/login` route.
    redirect("/login");
  }
  return <CreateTemplateMealPage />;
};

export default AddTemplateMealIndexPage;
