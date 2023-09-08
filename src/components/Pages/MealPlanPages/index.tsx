"use client";
import { FC } from "react";
import ClientViewMealPlanPage from "./ClientViewMealPlanPages";
import TrainerViewMealPlanPage from "./TrainerViewMealPlanPages";

const MealPlanPages: FC = () => {
  if (
    typeof window !== "undefined" &&
    localStorage.getItem("role") === "client"
  ) {
    return <ClientViewMealPlanPage />;
  }
  return <TrainerViewMealPlanPage />;
};

export default MealPlanPages;
