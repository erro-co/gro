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

// Input type based on the provided array
// type InputArrayItem = {
//   meal_plan: MealPlan;
//   meal_food_serving: {
//     quantity: number;
//     meal: Meal;
//     serving: Serving;
//     food: Food;
//   };
// };

// const convertRawDBToMealPLan = (inputArray: InputArrayItem[]): MealPlan => {
//   const mealPlanName = inputArray[0].meal_plan.name;
//   const meals: Meal[] = inputArray.map((item) => ({
//     name: item.meal_food_serving.meal.name,
//     foods: [
//       {
//         food: {
//           id: item.meal_food_serving.food.id,
//           name: item.meal_food_serving.food.name,
//           brand: item.meal_food_serving.food.brand,
//         },
//         serving: {
//           name: item.meal_food_serving.serving.name,
//           weight: item.meal_food_serving.serving.weight,
//           food: item.meal_food_serving.food.id,
//         },
//         serving_quantity: item.meal_food_serving.quantity,
//       },
//     ],
//   }));

//   return {
//     name: mealPlanName,
//     meals,
//   };
// };

const EditPlanPage: FC = () => {
  const pathId = usePathname()?.split("/")[4];
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
        "meal_plan(*), meal_food_serving(meal(*), quantity, serving(*), food(*, food_category(id, name)))",
      )
      .eq("meal_plan", pathId || "");
    if (error) {
      console.error("Error getting meal plan from supabase:", error);
      return;
    }
    console.log("meal_plan", meal_plan);
    // const transformedData = convertRawDBToMealPLan(meal_plan as any);
    // setSelectedMealPlan(transformedData);

    // setValue("name", transformedData.name);
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
