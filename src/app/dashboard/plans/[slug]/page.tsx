"use client";
import { supabase } from "@/lib/supabase";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingIcon from "@/components/icons/LoadingIcon";
import DisplayTable from "./DisplayTable";
import { Nutrition, ServingWithId } from "@/lib/schemas";
import MacroSummaryCard from "./MacroSummaryCard";

export type MealPlan = {
  id: number;
  created_at: string;
  name: string;
  template: boolean;
  meal_plan_food_serving_user: MealPlanFoodServingUser[];
};

type MealPlanFoodServingUser = {
  id: number;
  created_at: string;
  meal_food_serving: MealFoodServing;
  user: number;
  meal_plan_id: number;
};

export type MealFoodServing = {
  id: number;
  created_at: string;
  meal: number;
  food: Food;
  serving: ServingWithId;
  quantity: number;
  template: boolean;
};

export type Food = {
  id: number;
  created_at: string;
  name: string;
  food_category: number;
  tags: null | string[];
  brand: string;
  nutrients: Nutrition;
};

function groupByMeal(meals: any): any[][] {
  const grouped: { [key: number]: any } = {};

  meals.forEach((meal: any) => {
    const mealId = meal.meal_food_serving.meal;
    if (!grouped[mealId]) {
      grouped[mealId] = [];
    }
    grouped[mealId].push(meal.meal_food_serving);
  });

  // Convert the grouped object to an array of arrays,
  // where the first element is the meal ID and the second element is the array of meals
  const groupedArray = Object.entries(grouped).map(([mealId, meals]) => [
    Number(mealId),
    meals,
  ]);

  // Sort the array by the meal IDs
  groupedArray.sort((a, b) => a[0] - b[0]);

  // Remove the meal ID from the array
  const finalArray = groupedArray.map((item) => item[1]);

  return finalArray;
}

const DisplayMealPage: FC = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan>();
  const [meals, setMeals] = useState<MealFoodServing[][]>();
  const [loading, setLoading] = useState(true);
  const path = usePathname();

  const selectPlan = async () => {
    const planId = path.split("/")[3];
    const { data: meal_plan, error } = await supabase
      .from("meal_plan")
      .select(
        `*, meal_plan_food_serving_user(*, meal_food_serving(*, food(*, nutrients(*, food_id)), serving(*)))`,
      )
      .eq("id", planId)
      .eq("meal_plan_food_serving_user.meal_plan_id", planId);

    if (error) {
      console.log("Error getting meal plan:", error);
      return;
    }
    console.log("meal_plan", meal_plan);
    const grouped = groupByMeal(meal_plan[0].meal_plan_food_serving_user);
    console.log("grouped", grouped);
    setMealPlan(meal_plan[0] as MealPlan);
    setMeals(grouped as any);
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
    <div>
      <MacroSummaryCard mealPlan={mealPlan} />
      {meals?.map((meal, index) => (
        <DisplayTable key={index} foods={meal} />
      ))}
    </div>
  );
};

export default DisplayMealPage;
