"use client";
import { usePathname } from "next/navigation";
import { FC } from "react";
import Loading from "../../../../components/Loading";
import DisplayTable from "./DisplayTable";
import { useMealPlan } from "./hooks/useMealPlan";

const DisplayMealPage: FC = () => {
  const path = usePathname();
  const mealPlanId = path?.split("/")[3];

  const { mealPlan, loading } = useMealPlan(mealPlanId);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="-mt-8 lg:mt-0">
      <h2 className="text-3xl text-center font-semibold mb-6 lg:mb-12">
        {mealPlan?.meal_plan_name || ""}
      </h2>
      {mealPlan?.meals?.map((meal: MealFormattedWithSummary, index: number) => (
        <DisplayTable key={index} meal={meal} />
      ))}
    </div>
  );
};

export default DisplayMealPage;
