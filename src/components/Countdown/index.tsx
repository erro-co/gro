"use client";
import { FC, useEffect, useState } from "react";
import GroLogo from "../icons/Logo";

const getSecondsUntilTarget = () => {
  const now = new Date();

  // Adjust to AEST (UTC+10) time zone
  const targetDate = new Date(Date.UTC(2023, 7, 19, 9, 0, 0));

  // Return the difference in seconds
  return Math.round((targetDate.getTime() - now.getTime()) / 1000);
};

const secondsToTime = (secs: number) => {
  const days = Math.floor(secs / (24 * 60 * 60));
  const hoursDiv = secs % (24 * 60 * 60);
  const hours = Math.floor(hoursDiv / (60 * 60));
  const minutesDiv = hoursDiv % (60 * 60);
  const minutes = Math.floor(minutesDiv / 60);
  const seconds = Math.ceil(minutesDiv % 60);

  return { days, hours, minutes, seconds };
};

const CountdownTimer: FC = () => {
  const [timeLeft, setTimeLeft] = useState(getSecondsUntilTarget());
  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const { days, hours, minutes, seconds } = secondsToTime(timeLeft);

  return (
    <div className="flex flex-col items-center justify-center text-center mt-36">
      <div>
        <div className="w-40 mx-auto bg-gro-pink rounded-lg mb-12">
          <GroLogo />
        </div>
        <div className="flex space-x-4 ">
          <div className="md:text-6xl text-3xl">
            {days} <span className="md:text-4xl text-xl">Days</span>
          </div>
          <div className="md:text-6xl text-3xl">
            {hours} <span className="md:text-4xl text-xl">Hours</span>
          </div>
          <div className="md:text-6xl text-3xl">
            {minutes} <span className="md:text-4xl text-xl">Minutes</span>
          </div>
          <div className="md:text-6xl text-3xl">
            {seconds} <span className="md:text-4xl text-xl">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
