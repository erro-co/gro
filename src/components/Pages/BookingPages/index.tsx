import { FC } from "react";
import ClientViewBookingPage from "./ClientViewBookingPages";
import TrainerViewBookingPage from "./TrainerViewBookingPages";

const BookingPage: FC = () => {
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;
  console.log("role", role);
  switch (role) {
    case "client":
      return <ClientViewBookingPage />;
    case "trainer":
      return <TrainerViewBookingPage />;
    default:
      return <div>Invalid role or role not set</div>; // handle unexpected role
  }
};

export default BookingPage;
