import { FC } from "react";
import { motion } from "framer-motion";
import { Disclosure } from "@headlessui/react";
import MacroSummaryPieChart from "../MacroSummaryPieChart";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { MealPlan } from "../page";

export interface IMacroSummaryCard {
  mealPlan: any;
}

function calculateNutritionTotals(mealPlan: MealPlan): {
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  totalCals: number;
} {
  let totalProtein = 0;
  let totalFat = 0;
  let totalCarbs = 0;
  let totalCals = 0;

  mealPlan.meal_plan_food_serving_user.forEach((item) => {
    const food = item.meal_food_serving.food;
    const quantity = item.meal_food_serving.quantity;
    totalProtein += food.nutrients.protein * quantity;
    totalFat += food.nutrients.total_fat * quantity;
    totalCarbs += food.nutrients.total_carbs * quantity;
    totalCals += food.nutrients.calories * quantity;
  });
  return {
    totalProtein: Number(totalProtein.toFixed(1)),
    totalFat: Number(totalFat.toFixed(1)),
    totalCarbs: Number(totalCarbs.toFixed(1)),
    totalCals: Number(totalCals.toFixed(1)),
  };
}

const MacroSummaryCard: FC<IMacroSummaryCard> = ({ mealPlan }) => {
  const { totalProtein, totalFat, totalCarbs, totalCals } =
    calculateNutritionTotals(mealPlan);

  const pieChartData = [
    {
      name: "Protein",
      value: totalProtein,
    },
    {
      name: "Fat",
      value: totalFat,
    },
    {
      name: "Carbs",
      value: totalCarbs,
    },
  ];
  return (
    <div className="w-full lg:w-1/2 lg:mx-auto flex border-4 border-gro-indigo rounded-lg p-4 mb-12 flex-col">
      <p className="text-center text-3xl font-bold pb-2">
        {mealPlan?.name || "Meal Plan"}
      </p>
      <div className="flex lg:flex-row w-full">
        <MacroSummaryPieChart macros={pieChartData} totalCals={totalCals} />
        <div className="w-full lg:w-1/2 mx-auto flex">
          <div className="flex flex-col justify-evenly w-full space-y-2 px-4">
            <motion.div
              className="flex"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-6 h-6 bg-gro-pink rounded-full" />
              <div className="bg-gro-pink rounded-lg py-0.5 px-2 ml-2 flex-1">
                <p className="text-sm font-semibold text-white">
                  {totalProtein} Protein
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-6 h-6 bg-gro-purple rounded-full" />
              <div className="bg-gro-purple rounded-lg py-0.5 px-2 ml-2 flex-1">
                <p className="text-sm font-semibold text-white">
                  {totalFat} Fats
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-6 h-6 bg-gro-indigo rounded-full" />
              <div className="bg-gro-indigo rounded-lg py-0.5 px-2 ml-2 flex-1">
                <p className="text-sm font-semibold text-white">
                  {totalCarbs} Carbs
                </p>
              </div>
            </motion.div>
          </div>
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
  );
};

export default MacroSummaryCard;
