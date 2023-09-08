"use client";
import Loading from "@/components/Loading";
import { newMealPlanSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import AddNewMealPlan from "../CreatePlanPage";

export type FormSchemaType = z.infer<typeof newMealPlanSchema>;

type MealPlan = {
  name: string;
  meals: Meal[];
};

type Meal = {
  name: string;
  foods: FoodItem[];
};

type FoodItem = {
  food: {
    id: number;
    created_at?: string;
    name: string;
    food_category: number;
    brand: string;
  };
  serving: {
    id?: number;
    created_at?: string;
    name: string;
    weight: number;
    food: number;
  };
  serving_quantity: number;
  nutrients: Nutrients;
};

type Nutrients = {
  food: number;
  created_at: string;
  calories: number;
  protein: number;
  saturated_fat: number;
  trans_fat: number;
  sugar: number;
  fiber: number;
  cholesterol: number;
  sodium: number;
  vitamin_d: number;
  calcium: number;
  potassium: number;
  iron: number;
  total_fat: number;
  total_carbs: number;
};

// Input type based on the provided array
type InputArrayItem = {
  meal_plan: {
    id: number;
    created_at: string;
    name: string;
    template: boolean;
    client: any;
    trainer: string;
  };
  meal_food_serving: {
    quantity: number;
    meal: {
      id: number;
      name: string;
      notes?: any;
    };
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
      nutrients: Nutrients;
    };
  };
};

const convertRawDBToMealPLan = (inputArray: InputArrayItem[]): MealPlan => {
  const mealPlanName = inputArray[0].meal_plan.name;
  const meals: Meal[] = inputArray.map((item) => ({
    name: item.meal_food_serving.meal.name,
    foods: [
      {
        food: {
          id: item.meal_food_serving.food.nutrients.food,
          name: item.meal_food_serving.food.name,
          food_category: parseInt(
            item.meal_food_serving.food.food_category.name,
            10,
          ), // Assuming this should be a number
          brand: item.meal_food_serving.food.brand,
        },
        serving: {
          name: item.meal_food_serving.serving.name,
          weight: item.meal_food_serving.serving.weight,
          food: item.meal_food_serving.food.nutrients.food,
        },
        serving_quantity: item.meal_food_serving.quantity,
        nutrients: item.meal_food_serving.food.nutrients,
      },
    ],
  }));

  return {
    name: mealPlanName,
    meals,
  };
};

const EditPlanPage: FC = () => {
  const pathId = usePathname().split("/")[4];
  const [loading, setLoading] = useState(true);
  const [selectedMealPlan, setSelectedMealPlan] = useState<MealPlan | null>();
  const supabase = createClientComponentClient<Database>();

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(newMealPlanSchema),
  });

  const { setValue } = methods;

  const fetchMealPlan = async () => {
    const { data: meal_plan, error } = await supabase
      .from("meal_plan_food_serving_user")
      .select(
        "meal_plan(*), meal_food_serving(meal(id, name, notes), quantity, serving(name, weight), food(brand, name, food_category(id, name), nutrients(*)))",
      )
      .eq("meal_plan", pathId);
    if (error) {
      console.error("Error getting meal plan from supabase:", error);
      return;
    }
    console.log("meal_plan", meal_plan);
    const transformedData = convertRawDBToMealPLan(meal_plan as any);
    setSelectedMealPlan(transformedData);

    setValue("name", transformedData.name);
    // @ts-ignore
    setValue("meals", transformedData.meals);
    setLoading(false);
  };

  useEffect(() => {
    fetchMealPlan();
  }, []);

  if (loading) return <Loading />;

  return (
    <FormProvider {...methods}>
      <AddNewMealPlan />
    </FormProvider>
  );
};

export default EditPlanPage;
