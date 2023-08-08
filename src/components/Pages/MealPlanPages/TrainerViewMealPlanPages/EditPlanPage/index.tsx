"use client";
import Loading from "@/components/Loading";
import { newMealPlanSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  const supabase = createClientComponentClient<Database>();

  const fetchMealPlan = async () => {
    const { data: meal_plan, error } = await supabase
      .from("meal_plan_food_serving_user")
      .select(
        "meal_plan(*), meal_food_serving(meal(id, name, notes), quantity, serving(name, weight), food(brand, name, food_category(id, name), nutrients(*)))",
      )
      .eq("meal_plan", pathId)
      .single();

    if (error) {
      console.error("Error getting meal plan from supabase:", error);
      return;
    }
    console.log("meal_plan", meal_plan);
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
    // <FormProvider {...methods}>
    //   <AddNewMealPlan />
    // </FormProvider>
    <>
      <p>t</p>
    </>
  );
};

export default EditPlanPage;
