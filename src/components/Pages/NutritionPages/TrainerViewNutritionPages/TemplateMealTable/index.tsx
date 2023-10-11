import { TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { FC, useState } from "react";

export interface INutritionTable {
  meals: MealFormattedWithSummary[];
  isMobile: boolean;
}

const TableHeader: FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <thead>
      <tr>
        <th
          scope="col"
          className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
        >
          <button className="group inline-flex">Meal Name</button>
        </th>
        {!isMobile && (
          <>
            <th
              scope="col"
              className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
            >
              <button className="group inline-flex text-white">Brand</button>
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
            >
              Protein (g)
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
            >
              Fats (g)
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
            >
              Carbs (g)
            </th>
          </>
        )}
        <th
          scope="col"
          className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
        >
          Calories (kcal)
        </th>
        <th scope="col" className="">
          <span className="sr-only">Delete</span>
        </th>
        {!isMobile && (
          <th scope="col" className="relative py-2 pl-3 pr-4 sm:pr-6">
            <span className="sr-only">Edit</span>
          </th>
        )}
      </tr>
    </thead>
  );
};

const TemplateMealTable: FC<INutritionTable> = ({ meals, isMobile }) => {
  const [visibleMealId, setVisibleMealId] = useState<string | null>(null);

  const toggleMealFoods = (mealId: string) => {
    setVisibleMealId(visibleMealId === mealId ? null : mealId);
  };

  return (
    <div className="mt-2">
      <div className="flow-root">
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="overflow-hidden ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <TableHeader isMobile={isMobile} />
              <tbody className="divide-y divide-gray-200 bg-white">
                {meals?.map((meal: MealFormattedWithSummary, idx) => (
                  <>
                    <tr
                      key={idx}
                      className={clsx(
                        "font-light cursor-pointer hover:bg-gray-100",
                        idx % 2 !== 0 ? "bg-gray-50" : "",
                      )}
                      onClick={() => toggleMealFoods(meal.id)}
                    >
                      <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 font-bold">
                        {meal.name}
                        {isMobile && (
                          <p className="text-gray-400 font-light"></p>
                        )}
                      </td>
                      {!isMobile && (
                        <>
                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500"></td>
                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                            {meal.totalProtein}
                          </td>
                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                            {meal.totalFat}
                          </td>
                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                            {meal.totalCarbs}
                          </td>
                        </>
                      )}
                      <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                        {meal.totalCalories}
                      </td>
                      {!isMobile && (
                        <td className="relative whitespace-nowrap py-1 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </button>
                        </td>
                      )}
                      <td className="relative whitespace-nowrap py-1 pr-2 text-right text-sm font-medium">
                        <button className="text-red-500 pt-1">
                          <TrashIcon className="w-4" />
                        </button>
                      </td>
                    </tr>
                    {visibleMealId === meal.id &&
                      meal.foods?.map((foodDetail, foodIdx) => (
                        <tr
                          key={foodIdx}
                          className={clsx(
                            "font-light bg-gray-200 pl-4",
                            foodIdx % 2 !== 0 ? "bg-gray-250" : "",
                          )}
                        >
                          {" "}
                          {/* Indent and different bg color */}
                          <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                            {foodDetail.food.name}
                          </td>
                          {!isMobile && (
                            <>
                              <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                                {foodDetail.food.brand}
                              </td>
                              <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                                {foodDetail.food.protein}
                              </td>
                              <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                                {foodDetail.food.total_fat}
                              </td>
                              <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                                {foodDetail.food.total_carbohydrate}
                              </td>
                            </>
                          )}
                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                            {foodDetail.food.calories}
                          </td>
                          {/* Assuming no edit/delete actions for individual foods */}
                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                            {foodDetail.quantity} x {foodDetail.serving.name}{" "}
                            {"("}
                            {Number(
                              foodDetail.serving.weight * foodDetail.quantity,
                            ).toFixed()}
                            {"g)"}
                          </td>
                          {!isMobile && <td></td>}
                        </tr>
                      ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateMealTable;
