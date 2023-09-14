"use client";
import LoadingIcon from "@/components/icons/LoadingIcon";
import { supabase } from "@/lib/supabase";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import DisplayTable from "./DisplayTable";

export interface MealFoodServing {
  meal: Meal;
  quantity: number;
  serving: Serving;
  food: Food;
}

function sortMealFoodServing(mealFoodServings: MealFoodServing[]) {
  const sortedMealFoodServings: { [key: string]: MealFoodServing[] } = {};

  mealFoodServings.forEach((mealFoodServing: MealFoodServing) => {
    const mealId = mealFoodServing.meal.id;
    if (sortedMealFoodServings[mealId]) {
      sortedMealFoodServings[mealId].push(mealFoodServing);
    } else {
      sortedMealFoodServings[mealId] = [mealFoodServing];
    }
  });

  return Object.values(sortedMealFoodServings);
}

const DisplayMealPage: FC = () => {
  const [mealPlanName, setMealPlanName] = useState<string>("");
  const [meals, setMeals] = useState<MealFoodServing[][]>();
  const [loading, setLoading] = useState(true);

  const path = usePathname();
  const mealPlanId = path.split("/")[3];

  const selectPlan = async () => {
    const { data: meal_plan, error } = await supabase
      .from("meal_plan_food_serving_user")
      .select(
        "meal_plan(*), meal_food_serving(meal(id, name, notes), quantity, serving(name, weight), food(*, food_category(name)))",
      )
      .eq("meal_plan", mealPlanId);
    if (error) {
      console.error("Error getting meal plan from supabase:", error);
      return;
    }
    console.log("meal_plan", meal_plan);

    // @ts-ignore
    setMealPlanName(meal_plan[0].meal_plan.name);

    const formattedMeals = meal_plan.map((meal: any) => meal.meal_food_serving);

    const grouped = sortMealFoodServing(formattedMeals as MealFoodServing[]);
    console.log("grouped", grouped);
    setMeals(grouped);
    setLoading(false);
  };

  useEffect(() => {
    selectPlan();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <div className="w-32 mx-auto mt-24">
          <LoadingIcon />
        </div>
      </div>
    );
  }

  return (
    <div className="-mt-8 lg:mt-0">
      <h2 className="text-3xl text-center font-semibold mb-6 lg:mb-12">
        {mealPlanName}
      </h2>
      {meals?.map((meal: MealFoodServing[], index: number) => (
        <DisplayTable key={index} foods={meal} />
      ))}
      {/* {mealPlan && <MacroSummaryCard mealPlan={mealPlan} />} */}
    </div>
  );
};

export default DisplayMealPage;
