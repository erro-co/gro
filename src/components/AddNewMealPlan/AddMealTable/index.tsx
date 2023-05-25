"use client";

import { MealPlanFoodItem } from "@/lib/schemas";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Dispatch, FC, SetStateAction } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export interface IAddMealTable {
  mealIndex: number;
  setShowFoodSearchModal: Dispatch<SetStateAction<boolean>>;
  removeMeal: (id: number) => void;
}
const AddMealTable: FC<IAddMealTable> = ({
  mealIndex,
  setShowFoodSearchModal,
  removeMeal,
}) => {
  const { control, watch, register } = useFormContext();

  const { remove } = useFieldArray({
    control,
    name: `meals[${mealIndex}].foods`,
  });

  const foodList = watch(`meals[${mealIndex}].foods`);

  return (
    <div className="px-4 sm:px-6 lg:px-8 my-4">
      <div className="w-full flex mt-6">
        <div className="rounded-md flex border-2 p-1 focus-within:border-indigo-500">
          <input
            type="text"
            defaultValue={`Meal ${mealIndex + 1}`}
            {...register(`meals[${mealIndex}].name`)}
            className="focus:outline-none"
          />
          <PencilIcon className="w-6 ml-2 text-gray-400" />
        </div>
      </div>

      <div className="mt-2 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Food Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Brand
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Protein
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Fats
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Carbs
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Calories
                    </th>
                    <th
                      scope="col"
                      className={clsx(
                        mealIndex > 0 ? "" : "hidden",
                        "relative py-3.5 pr-4 sm:pr-6 flex",
                      )}
                    >
                      <button
                        onClick={() => removeMeal(mealIndex)}
                        className="p-2 bg-gray-500 ml-auto text-white rounded-md"
                      >
                        Delete Meal
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {foodList?.map((f: MealPlanFoodItem, idx: number) => (
                    <tr key={idx}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {f.food.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {f.food.brand}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {f.nutrients.protein}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {f.nutrients.saturated_fat + f.nutrients.trans_fat}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {f.nutrients.sugar + f.nutrients.fiber}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {f.nutrients.calories}
                      </td>
                      <td className="relative whitespace-nowrap py-4 p-6 text-right text-sm font-medium">
                        <button
                          onClick={() => remove(idx)}
                          className="text-white p-2 bg-red-500 rounded-md"
                        >
                          Remove<span className="sr-only">, {f.food.name}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={7} className="py-4 text-center">
                      <div className="text-center">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => setShowFoodSearchModal(true)}
                        >
                          <PlusCircleIcon
                            className="-ml-1 mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          Add Food
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMealTable;
