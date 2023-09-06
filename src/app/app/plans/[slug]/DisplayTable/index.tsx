import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { MealFoodServing } from "../page";

interface IDisplayTable {
  foods: MealFoodServing[];
}

function getTotalMacro(
  foods: MealFoodServing[],
  macro: keyof (typeof foods)[0]["food"]["nutrients"],
): number {
  const total = foods.reduce(
    (total, food) => total + food.food.nutrients[macro] * food.quantity,
    0,
  );
  return parseFloat(total.toFixed(1));
}

const DisplayTable: FC<IDisplayTable> = ({ foods }) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  return (
    <div className="pb-12">
      <h2 className="font-semibold">{foods[0].meal.name}</h2>
      <div className="mt-2 border border-gray-300 rounded-lg p-1">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-2 pl-2 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Food
              </th>
              <th
                scope="col"
                className="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Brand
              </th>
              <th
                scope="col"
                className="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Protein (g)
              </th>
              <th
                scope="col"
                className="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Fats (g)
              </th>
              <th
                scope="col"
                className="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Carbs (g)
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
              >
                Calories {isMobile ? null : "(kcal)"}
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
              >
                Servings
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {foods.map((food: MealFoodServing, idx) => (
              <tr key={idx} className="font-light text-xs lg:text-sm">
                <td className="whitespace-nowrap py-2 pl-2 pr-3  text-gray-900 sm:pl-0">
                  {food.food.name}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-1  text-gray-500 lg:table-cell">
                  {food.food.brand}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-1  text-gray-500 lg:table-cell">
                  {food.food.nutrients.protein * food.quantity}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-1 text-gray-500 lg:table-cell">
                  {food.food.nutrients.total_fat * food.quantity}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-1 text-gray-500 lg:table-cell">
                  {food.food.nutrients.total_carbs * food.quantity}
                </td>
                <td className="whitespace-nowrap px-3 py-1 text-gray-500 sm:table-cell">
                  {food.food.nutrients.calories * food.quantity}
                </td>
                <td className="whitespace-nowrap px-3 py-1 text-gray-500 lg:table-cell">
                  {food.quantity} {food.serving.name}
                </td>
              </tr>
            ))}
            <tr className="text-xs lg:text-sm">
              <td
                className="whitespace-nowrap py-2 pl-2 pr-3 font-bold text-gray-900 sm:pl-0"
                colSpan={isMobile ? 1 : 2}
              >
                Totals:
              </td>
              <td className="hidden whitespace-nowrap px-3 py-1  font-bold lg:table-cell">
                <p>{getTotalMacro(foods, "protein")}</p>
              </td>
              <td className="hidden lg:table-cell whitespace-nowrap px-3 py-1 font-bold">
                <p>{getTotalMacro(foods, "total_fat")}</p>
              </td>
              <td className="hidden lg:table-cell whitespace-nowrap px-3 py-1 font-bold">
                <p>{getTotalMacro(foods, "total_carbs")}</p>
              </td>
              <td className="whitespace-nowrap px-3 py-1 font-bold">
                <p>{getTotalMacro(foods, "calories")}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {foods[0].meal.notes !== null ? (
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 border">
                Summary & Notes
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm">
                {foods[0].meal.notes}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ) : null}
    </div>
  );
};

export default DisplayTable;
