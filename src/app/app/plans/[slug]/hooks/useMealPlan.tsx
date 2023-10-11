// hooks/useMealPlan.ts

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export const useMealPlan = (mealPlanId: string) => {
  const [mealPlan, setMealPlan] = useState<CompleteMealPlanJoined>();
  const [loading, setLoading] = useState(true);

  function transformData(data: any[]): CompleteMealPlanJoined {
    if (!data.length) throw new Error("Data is empty!");

    const result: CompleteMealPlanJoined = {
      meal_plan_id: data[0].meal_plan.id,
      meal_plan_name: data[0].meal_plan.name,
      meals: [],
    };

    data.forEach((item) => {
      const mealId = item.meal_food_serving.meal.id;

      // Find or create the meal
      let meal = result.meals.find((m) => m.id === mealId);
      if (!meal) {
        meal = {
          id: mealId,
          name: item.meal_food_serving.meal.name,
          notes: item.meal_food_serving.meal.notes,
          foods: [],
        };
        result.meals.push(meal);
      }

      const factor =
        (item.meal_food_serving.serving.weight / 100) *
        item.meal_food_serving.quantity;

      // Add the food data to the meal
      meal.foods!.push({
        quantity: item.meal_food_serving.quantity,
        serving: {
          food: item.meal_food_serving.food.name,
          id: item.meal_food_serving.food.id,
          name: item.meal_food_serving.serving.name,
          weight: item.meal_food_serving.serving.weight,
        },
        food: {
          brand: item.meal_food_serving.food.brand,
          calories: item.meal_food_serving.food.calories * factor,
          category: item.meal_food_serving.food.category,
          cholesterol: item.meal_food_serving.food.cholesterol * factor,
          fibre: item.meal_food_serving.food.fibre * factor,
          id: item.meal_food_serving.food.id,
          name: item.meal_food_serving.food.name,
          protein: item.meal_food_serving.food.protein * factor,
          saturated_fat: item.meal_food_serving.food.saturated_fat * factor,
          sodium: item.meal_food_serving.food.sodium * factor,
          sugar: item.meal_food_serving.food.sugar * factor,
          total_carbohydrate:
            item.meal_food_serving.food.total_carbohydrate * factor,
          total_fat: item.meal_food_serving.food.total_fat * factor,
          trans_fat: item.meal_food_serving.food.trans_fat * factor,
        },
      });
    });

    // Calculate total values for each meal
    result.meals.forEach((meal) => {
      meal.totalCalories = meal.foods!.reduce(
        (sum, f) => sum + f.food.calories,
        0,
      );
      meal.totalFat = meal.foods!.reduce((sum, f) => sum + f.food.total_fat, 0);
      meal.totalProtein = meal.foods!.reduce(
        (sum, f) => sum + f.food.protein,
        0,
      );
      meal.totalCarbs = meal.foods!.reduce(
        (sum, f) => sum + f.food.total_carbohydrate,
        0,
      );
    });

    // Calculate meal total values for the meal plan
    result.mealTotalCalories = result.meals.reduce(
      (sum, m) => sum + (m.totalCalories || 0),
      0,
    );
    result.mealTotalFat = result.meals.reduce(
      (sum, m) => sum + (m.totalFat || 0),
      0,
    );
    result.mealTotalProtein = result.meals.reduce(
      (sum, m) => sum + (m.totalProtein || 0),
      0,
    );

    return result;
  }

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

    const transformed = transformData(meal_plan as any);

    setMealPlan(transformed);
    setLoading(false);
  };

  useEffect(() => {
    selectPlan();
  }, [mealPlanId]);

  return { mealPlan, loading };
};
