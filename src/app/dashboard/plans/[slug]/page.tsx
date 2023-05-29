"use client";
import { supabase } from "@/lib/supabase";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const DisplayMealPage: FC = () => {
  const [mealPlan, setMealPlan] = useState<any>({});
  const path = usePathname();

  const selectPlan = async () => {
    const planId = path.split("/")[3];
    const { data: meal_plan, error } = await supabase
      .from("meal_plan")
      .select(
        `*, meal_plan_food_serving_user(*, meal_food_serving(*, food(*), meal(*)))`,
      )
      .eq("id", planId)
      .eq("meal_plan_food_serving_user.meal_plan_id", planId);

    if (error) {
      console.log("Error getting meal plan:", error);
      return;
    }
    console.log("meal_plan", meal_plan);
  };

  useEffect(() => {
    selectPlan();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">My Plan</h1>
    </div>
  );
};

export default DisplayMealPage;
