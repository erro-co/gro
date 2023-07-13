import MonthViewCalendar from "@/components/Calendars/MonthViewCalendar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Gro - Schedule",
  icons: {
    icon: "/gro_logo.png",
  },
};
const ScheduleIndexPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/login` route.
    redirect("/login");
  }
  return <MonthViewCalendar />;
};

export default ScheduleIndexPage;
