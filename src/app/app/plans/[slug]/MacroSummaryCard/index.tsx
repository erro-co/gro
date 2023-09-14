import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { motion } from "framer-motion";
import { FC } from "react";
import MacroSummaryPieChart from "../MacroSummaryPieChart";
import { MealFoodServing } from "../page";

export interface IMacroSummaryCard {
  mealPlan: MealFoodServing[];
}

function calculateNutritionTotals(mealPlan: MealFoodServing[]): {
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  totalCalories: number;
} {
  let totalProtein = 0;
  let totalFat = 0;
  let totalCarbs = 0;
  let totalCalories = 0;

  mealPlan.forEach((item: MealFoodServing) => {
    const food = item.food;
    const quantity = item.quantity;
    totalProtein += food.protein * quantity;
    totalFat += food.total_fat * quantity;
    totalCarbs += food.total_carbohydrate * quantity;
    totalCalories += food.calories * quantity;
  });
  return {
    totalProtein: Number(totalProtein.toFixed(1)),
    totalFat: Number(totalFat.toFixed(1)),
    totalCarbs: Number(totalCarbs.toFixed(1)),
    totalCalories: Number(totalCalories.toFixed(1)),
  };
}

const MacroSummaryCard: FC<IMacroSummaryCard> = ({ mealPlan }) => {
  const { totalProtein, totalFat, totalCarbs, totalCalories } =
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
    <div className="w-full flex flex-col mb-6">
      {/* <h2 className="text-center text-2xl font-bold pb-2">
        {mealPlan?.name || "Meal Plan"}
      </h2> */}
      <div className="flex mx-auto">
        <MacroSummaryPieChart
          macros={pieChartData}
          totalCalories={totalCalories}
        />
        <div className="w-full mx-auto lg:mx-0 lg:ml-4 flex">
          <div className="flex flex-col my-auto ml-4 mt-4 w-full lg:w-[500px] space-y-2">
            <motion.div
              className={clsx("flex")}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-6 h-6 bg-gro-pink rounded-full" />
              <div
                className={clsx(
                  "bg-gro-pink rounded-lg py-0.5 px-2 ml-2 flex-1",
                )}
              >
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
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacroSummaryCard;
