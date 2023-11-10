import { FC } from "react";
import TrainerViewBookingPage from "./TrainerViewBookingPages";

const BookingPage: FC = () => {
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;
  console.log("role", role);
  switch (role) {
    case "client":
      return <TrainerViewBookingPage />;
    case "trainer":
      return <TrainerViewBookingPage />;
    default:
      return <TrainerViewBookingPage />; // handle unexpected role
  }
};

export default BookingPage;
