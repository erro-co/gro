"use client";
import { FC } from "react";
import ClientViewBookingPage from "./ClientViewBookingPages";
import TrainerViewBookingPage from "./TrainerViewBookingPages";

const BookingPage: FC = () => {
  if (
    typeof window !== "undefined" &&
    localStorage.getItem("role") === "client"
  ) {
    return <ClientViewBookingPage />;
  }
  return <TrainerViewBookingPage />;
};

export default BookingPage;
