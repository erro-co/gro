"use client";
import { FC, useEffect, useState } from "react";

const getSecondsUntil6amAEST = () => {
  const now = new Date();
  const tomorrow6amAEST = new Date();

  // Adjust to AEST (UTC+10) time zone
  tomorrow6amAEST.setUTCHours(20, 0, 0, 0);

  // If it's already past 6am AEST, set the target to the next day
  if (now > tomorrow6amAEST) {
    tomorrow6amAEST.setUTCDate(tomorrow6amAEST.getUTCDate() + 1);
  }

  // Return the difference in seconds
  return Math.round((tomorrow6amAEST.getTime() - now.getTime()) / 1000);
};

const CountdownTimer: FC = () => {
  const [timeLeft, setTimeLeft] = useState(getSecondsUntil6amAEST());

  useEffect(() => {
    if (!timeLeft) {
      setTimeLeft(getSecondsUntil6amAEST());
    } else {
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeLeft]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-6xl">{timeLeft}</div>
    </div>
  );
};

export default CountdownTimer;
