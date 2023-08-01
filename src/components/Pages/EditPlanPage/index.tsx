"use client";
import { useForm, FormProvider } from "react-hook-form";
import AddNewMealPlan from "@/components/Pages/CreatePlanPage";
import { zodResolver } from "@hookform/resolvers/zod";
import { newMealPlanSchema } from "@/lib/schemas";
import { z } from "zod";
import { FC, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { usePathname } from "next/navigation";
import Loading from "@/components/Loading";
import { MealPlan } from "@/lib/types";

export type FormSchemaType = z.infer<typeof newMealPlanSchema>;

export interface MealFoodServing {
  meal: {
    id: number;
    name: string;
    notes: string;
  };
  quantity: number;
  serving: {
    name: string;
    weight: number;
  };
  food: {
    brand: string;
    name: string;
    food_category: {
      name: string;
    };
    nutrients: {
      calories: number;
      protein: number;
      total_fat: number;
      total_carbs: number;
      fiber: number;
      sugar: number;
      potassium: number;
      sodium: number;
      cholesterol: number;
      saturated_fat: number;
      vitamin_d: number;
      calcium: number;
      iron: number;
      trans_fat: number;
    };
  };
}

export type ReturnedData = {
  meal_plan: MealPlan;
  meal_food_serving: MealFoodServing;
};

const EditPlanPage: FC = () => {
  const pathId = usePathname().split("/")[4];
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  const fetchMealPlan = async () => {
    const { data: meal_plan, error } = await supabase
      .from("meal_plan_food_serving_user")
      .select(
        "meal_plan(*), meal_food_serving(meal(id, name, notes), quantity, serving(name, weight), food(brand, name, food_category(id, name), nutrients(*)))",
      )
      .eq("meal_plan_id", pathId);

    if (error) {
      console.error("Error getting meal plan from supabase:", error);
      return;
    }
    console.log("meal_plan", meal_plan);
    setData(meal_plan);
    setLoading(false);
  };

  useEffect(() => {
    fetchMealPlan();
  }, []);

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(newMealPlanSchema),
  });

  if (loading) return <Loading />;

  return (
    <FormProvider {...methods}>
      <AddNewMealPlan />
    </FormProvider>
  );
};

export default EditPlanPage;
