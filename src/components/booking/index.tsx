"use client";
import React, { FC, useEffect } from "react";
import axios from "axios";

const Booking: FC = () => {
  const getBooking = async () => {
    const response = await axios.get(
      "https://connect.squareupsandbox.com/v2/bookings",
      {
        headers: {
          "Square-Version": "2023-07-20",
          Authorization:
            "Bearer EAAAELLRbm5OYt40rLFbF2a66x0AS7HimkZyjYRQbYBo7TDUIz3XjR40rqyumWyr",
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response);
  };

  useEffect(() => {
    getBooking();
  }, []);

  return <div>Booking</div>;
};

export default Booking;
