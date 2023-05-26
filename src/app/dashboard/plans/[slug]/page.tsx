"use client";
import DisplayMealPlanTable from "@/components/DisplayMealPlan/DisplayMealPlanTable";
import { Meal } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";
import { FC, useEffect, useState } from "react";

const DisplayMealPage: FC = () => {
  const [mealPlan, setMealPlan] = useState<any>({});
  const getMealPlanData = async () => {
    const { data, error } = await supabase.from("meal_plan").select("*");
    console.log("data", data);
  };

  useEffect(() => {
    getMealPlanData();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold">My Plan</h1>
      {mealPlan.meals.map((meal: Meal, idx: number) => (
        <DisplayMealPlanTable meal={meal} key={idx} />
      ))}
    </div>
  );
};

export default DisplayMealPage;
