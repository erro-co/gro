"use client";
import { supabase } from "@/lib/supabase";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PieChart, Pie, Cell } from "recharts";
import LoadingIcon from "@/components/icons/LoadingIcon";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import DisplayTable from "./DisplayTable";
import { Nutrition, ServingWithId } from "@/lib/schemas";

const data = [
  {
    name: "Protein",
    value: 100,
  },
  {
    name: "Fats",
    value: 100,
  },
  {
    name: "Carbs",
    value: 100,
  },
];
const COLORS = ["#F695A0", "#DC7CDE", "#A351FA"];

type MealPlan = {
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
      <div className="w-40">
        <LoadingIcon />
      </div>
    );
  }

  return (
    <div>
      <div className="w-full mb-6 flex bg-gro-pink/50 rounded-lg p-4 flex-col">
        <p className="text-center text-3xl font-bold pb-2">
          {mealPlan?.name || "Meal Plan"}
        </p>
        <div className="flex flex-col lg:flex-row w-full">
          <div className="mx-auto">
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                cx={90}
                cy={90}
                innerRadius={50}
                outerRadius={90}
                stroke="none"
                fill="#8884d8"
                paddingAngle={1}
                dataKey="value"
                isAnimationActive={false}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="bg-white rounded-lg w-full lg:w-1/2 mx-auto flex flex-col lg:flex-col-reverse">
            <div className="flex justify-evenly space-x-4 px-2">
              <div className="p-1 bg-gro-pink rounded-lg my-2 flex-1">
                <p className="text-center text-normal font-semibold text-white">
                  250
                </p>
                <p className="text-center text-normal font-semibold text-white">
                  Protein
                </p>
              </div>
              <div className="p-1 bg-gro-purple rounded-lg my-2 flex-1">
                <p className="text-center text-normal font-semibold text-white">
                  250
                </p>
                <p className="text-center text-normal font-semibold text-white">
                  Fats
                </p>
              </div>
              <div className="p-1 bg-gro-indigo rounded-lg my-2 flex-1">
                <p className="text-center text-normal font-semibold text-white">
                  250
                </p>
                <p className="text-center text-normal font-semibold text-white">
                  Carbs
                </p>
              </div>
              {/* <div className="p-2 py-4 bg-gro-purple rounded-lg my-4 flex-1">
                <p className="text-center text-normal font-semibold text-white">
                  250
                </p>
                <p className="text-center text-normal font-semibold text-white">
                  Protein
                </p>
              </div>
              <div className="p-2 py-4 bg-gro-indigo rounded-lg my-4 flex-1">
                <p className="text-center text-normal font-semibold text-white">
                  250
                </p>
                <p className="text-center text-normal font-semibold text-white">
                  Protein
                </p>
              </div> */}
            </div>
            <p className="font-bold text-xl text-center mb-2">Totals</p>
          </div>
        </div>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Meal Plan Notes</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      {meals?.map((meal, index) => (
        <DisplayTable key={index} foods={meal} />
      ))}
    </div>
  );
};

export default DisplayMealPage;
