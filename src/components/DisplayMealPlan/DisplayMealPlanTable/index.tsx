import { Meal, MealPlanFoodItem } from "@/lib/schemas";
import clsx from "clsx";
import { FC } from "react";

export interface IDisplayMealPlanTable {
  meal: Meal;
}

const DisplayMealPlanTable: FC<IDisplayMealPlanTable> = ({ meal }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Food
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Brand
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Protein
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Fats
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Carbs
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Serving
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Select</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {meal?.foods?.map((food: MealPlanFoodItem, idx) => (
              <tr key={idx}>
                <td
                  className={clsx(
                    idx === 0 ? "" : "border-t border-transparent",
                    "relative py-4 pl-4 pr-3 text-sm sm:pl-6",
                  )}
                >
                  <div className="font-medium text-gray-900">
                    {food.food.name}
                  </div>
                </td>
                <td
                  className={clsx(
                    idx === 0 ? "" : "border-t border-gray-200",
                    "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell",
                  )}
                >
                  {food.food.brand}
                </td>
                <td
                  className={clsx(
                    idx === 0 ? "" : "border-t border-gray-200",
                    "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell",
                  )}
                >
                  {food.nutrients.protein}
                </td>
                <td
                  className={clsx(
                    idx === 0 ? "" : "border-t border-gray-200",
                    "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell",
                  )}
                >
                  {food.nutrients.total_fat}
                </td>
                <td
                  className={clsx(
                    idx === 0 ? "" : "border-t border-gray-200",
                    "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell",
                  )}
                >
                  {food.nutrients.total_carbs}
                </td>

                <td
                  className={clsx(
                    idx === 0 ? "" : "border-t border-transparent",
                    "relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6",
                  )}
                >
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    Select<span className="sr-only">, {food.food.name}</span>
                  </button>
                  {idx !== 0 ? (
                    <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" />
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayMealPlanTable;
