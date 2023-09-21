"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import CalendarHeader from "./CalendarHeader";
import WeekViewCalendar from "./WeekViewCalendar";

export type CalendarViews = "day" | "week" | "month" | "year";
export type SquareAppointmentResponse = {
  id: string;
  version: number;
  status: "CANCELLED_BY_SELLER" | "ACCEPTED"; // Add other statuses if available
  createdAt: string; // Consider using Date if you'll parse the string
  updatedAt: string; // Consider using Date if you'll parse the string
  startAt: string; // Consider using Date if you'll parse the string
  locationId: string;
  customerId: string;
  appointmentSegments: AppointmentSegment[];
  transitionTimeMinutes: number;
  allDay: boolean;
  locationType: "BUSINESS_LOCATION"; // Add other types if available
  creatorDetails: CreatorDetails;
  source: "FIRST_PARTY_MERCHANT"; // Add other sources if available
};

type AppointmentSegment = {
  durationMinutes: number;
  serviceVariationId: string;
  teamMemberId: string;
  serviceVariationVersion: string;
  intermissionMinutes: number;
  anyTeamMember: boolean;
};

type CreatorDetails = {
  creatorType: "TEAM_MEMBER"; // Add other types if available
  teamMemberId: string;
};

export type Appointment = {
  id: string;
  status: "CANCELLED_BY_SELLER" | "ACCEPTED";
  startAt: string;
  endAt: string;
  durationMinutes: number;
};

function mapAppointments(
  appointments: SquareAppointmentResponse[],
): Appointment[] {
  return appointments.map((appointment) => {
    // Sum the duration from each segment
    const totalDuration = appointment.appointmentSegments.reduce(
      (sum, segment) => sum + segment.durationMinutes,
      0,
    );

    // Convert startAt to Date and add totalDuration
    const startDate = new Date(appointment.startAt);
    const endDate = new Date(startDate.getTime() + totalDuration * 60000); // 60000ms = 1 minute

    // Convert endDate back to string format
    const endAt = endDate.toISOString(); // Assuming you want ISO string format

    return {
      id: appointment.id,
      status: appointment.status,
      startAt: appointment.startAt,
      endAt: endAt,
      durationMinutes: totalDuration,
    };
  });
}

export default function Calendar() {
  const [calendarView, setCalendarView] = useState<CalendarViews>("week");
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const supabase = createClientComponentClient<Database>();

  const fetchAppointments = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const data = await axios.get(
      `https://gro-api.vercel.app/bookings?q=${user?.email}`,
    );
    const mappedAppointments = mapAppointments(data.data.bookings);
    console.log(mappedAppointments);
    setAppointments(mappedAppointments);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <>
      <h2 className="my-4">My total bookings left: {appointments.length}</h2>
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
    </>
  );
}
