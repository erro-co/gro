"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import CalendarHeader from "./CalendarHeader";
import WeekViewCalendar from "./WeekViewCalendar";

export type CalendarViews = "day" | "week" | "month" | "year";

export default function Calendar() {
  const [calendarView, setCalendarView] = useState<CalendarViews>("week");
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<any[]>([]);

  const supabase = createClientComponentClient<Database>();

  const fetchAppointments = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const data = await axios.get(
      `https://gro-api.vercel.app/bookings?q=${user?.email}`,
    );
    console.log(data.data.bookings);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-2 border rounded-lg">
      <CalendarHeader />
      <div>
        {calendarView === "day" && <div>Day view</div>}
        {calendarView === "week" && (
          <WeekViewCalendar
            currentDate={date}
            selectedDate={selectedDate}
            appointments={appointments}
          />
        )}
        {calendarView === "month" && <div>Month view</div>}
        {calendarView === "year" && <div>Year view</div>}
      </div>
    </div>
  );
}
