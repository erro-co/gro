"use client";
import { Appointment } from "@/lib/types";
import { FC, Fragment, useEffect, useRef, useState } from "react";

export interface IWeekViewCalendar {
  currentDate?: Date;
  selectedDate?: Date;
  appointments?: Appointment[];
}

const currentDateClass =
  "ml-1.5 flex h-8 w-8 rounded-full bg-indigo-600 font-semibold text-white";

const Event: FC<{ appointment: Appointment }> = ({ appointment }) => {
  const convertToAEST = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-AU", {
      timeZone: "Australia/Sydney", // Sydney falls under AEST
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const getGridRowStart = (time: string) => {
    const [hours, minutes] = time.split(":");
    return 2 + parseInt(hours, 10) * 12 + Math.floor(parseInt(minutes, 10) / 5);
  };
  const appointmentDay = new Date(appointment.startAt).getDay();
  const startTimeAEST = convertToAEST(appointment.startAt);
  const gridRowStart = getGridRowStart(startTimeAEST);
  const gridRowSpan = Math.ceil(appointment.durationMinutes / 2);
  const gridColumnStart = appointmentDay === 0 ? 7 : appointmentDay;

  return (
    <li
      className={`relative mt-px flex col-start-${gridColumnStart}`}
      style={{ gridRow: `${gridRowStart} / span ${gridRowSpan}` }}
    >
      <a
        href="#"
        className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
      >
        <p className="order-1 font-semibold text-blue-700">Training</p>
        <p className="text-blue-500 group-hover:text-blue-700">
          <time dateTime={appointment.startAt}>{startTimeAEST}</time>
        </p>
      </a>
    </li>
  );
};
const getWeekDates = (date: Date): Date[] => {
  const startDate = new Date(date);
  const day = startDate.getDay();

  // If it's Sunday, set to previous Monday
  if (day === 0) {
    startDate.setDate(date.getDate() - 6);
  }
  // Else set to the previous Monday of the current week
  else {
    startDate.setDate(date.getDate() - (day - 1));
  }

  const dates = [startDate];

  for (let i = 1; i < 7; i++) {
    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + i);
    dates.push(nextDate);
  }
  return dates;
};

const WeekViewCalendar: FC<IWeekViewCalendar> = ({
  currentDate,
  appointments,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const containerNav = useRef<HTMLDivElement>(null);
  const containerOffset = useRef<HTMLDivElement>(null);
  const [weekDates, setWeekDates] = useState<Date[]>();

  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60;

    if (container.current && containerNav.current && containerOffset.current) {
      container.current.scrollTop =
        ((container.current.scrollHeight -
          containerNav.current.offsetHeight -
          containerOffset.current.offsetHeight) *
          currentMinute) /
        1440;
    }

    if (currentDate) {
      setWeekDates(getWeekDates(currentDate));
    }
  }, []);

  return (
    <div
      ref={container}
      className="isolate flex flex-auto flex-col overflow-auto bg-white"
    >
      <div
        style={{ width: "165%" }}
        className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
      >
        <div
          ref={containerNav}
          className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
        >
          <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
            {weekDates?.map((date, idx) => (
              <button
                key={idx}
                type="button"
                className="flex flex-col items-center pb-3 pt-2"
              >
                {["S", "M", "T", "W", "T", "F", "S"][date.getDay()]}{" "}
                <span
                  className={`mt-1 flex h-8 w-8 items-center justify-center ${
                    currentDate &&
                    currentDate.toDateString() === date.toDateString()
                      ? currentDateClass
                      : "font-semibold text-gray-900"
                  }`}
                >
                  {date.getDate()}
                </span>
              </button>
            ))}
          </div>

          <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
            <div className="col-end-1 w-14" />
            {weekDates?.map((date, idx) => (
              <div key={idx} className="flex items-center justify-center py-3">
                <span className="flex items-baseline">
                  {
                    ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][
                      date.getDay()
                    ]
                  }
                  <span
                    className={`ml-1 items-center justify-center ${
                      currentDate &&
                      currentDate.toDateString() === date.toDateString()
                        ? currentDateClass
                        : "font-semibold text-gray-900 "
                    }`}
                  >
                    {date.getDate()}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-auto">
          <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
          <div className="grid flex-auto grid-cols-1 grid-rows-1">
            {/* Horizontal lines */}
            <TimeSlots />

            {/* Vertical lines */}
            <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
              <div className="col-start-1 row-span-full" />
              <div className="col-start-2 row-span-full" />
              <div className="col-start-3 row-span-full" />
              <div className="col-start-4 row-span-full" />
              <div className="col-start-5 row-span-full" />
              <div className="col-start-6 row-span-full" />
              <div className="col-start-7 row-span-full" />
              <div className="col-start-8 row-span-full w-8" />
            </div>

            {/* Events */}
            <ol
              className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
              style={{
                gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
              }}
            >
              {appointments?.map((appointment, idx) => (
                <Event key={idx} appointment={appointment} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimeSlots: FC = () => {
  const times = [
    "12AM",
    "1AM",
    "2AM",
    "3AM",
    "4AM",
    "5AM",
    "6AM",
    "7AM",
    "8AM",
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
    "6PM",
    "7PM",
    "8PM",
    "9PM",
    "10PM",
    "11PM",
  ];

  return (
    <div
      className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
      style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
    >
      <div className="row-end-1 h-7"></div>
      {times.map((time, index) => (
        <Fragment key={index}>
          <div>
            <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              {time}
            </div>
          </div>
          <div />
        </Fragment>
      ))}
    </div>
  );
};

export default WeekViewCalendar;
