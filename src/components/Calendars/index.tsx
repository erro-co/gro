"use client";
import { MapSquareAppointments } from "@/lib/helpers";
import { Appointment } from "@/lib/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import CalendarHeader from "./CalendarHeader";
import WeekViewCalendar from "./WeekViewCalendar";

export type CalendarViews = "day" | "week" | "month" | "year";
const testEmail = "rosieg98@hotmail.com";

export default function Calendar() {
  const [calendarView, setCalendarView] = useState<CalendarViews>("week");
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClientComponentClient<Database>();

  const fetchAppointments = async () => {
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();
    // const data = await axios.get(
    //   `https://gro-api.vercel.app/bookings?q=${user?.email}`,
    // );

    const data = await axios.get(`https://gro-api.vercel.app/bookings/all`);
    if (data.data.length === 0) return;
    const mappedAppointments = MapSquareAppointments(data.data.bookings);
    console.log(mappedAppointments, data.data.bookings);
    setAppointments(mappedAppointments);
    setLoading(false);
  };

  const fetchAppointmentsByDate = async (date: Date) => {};

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="p-2 border rounded-lg">
        <CalendarHeader
          currentDate={date}
          selectedDate={selectedDate}
          calendarView={calendarView}
          setCalendarView={setCalendarView}
          appointmentAmount={appointments.length}
        />
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
    </>
  );
}
