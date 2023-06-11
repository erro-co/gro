"use client";
import { useMealIndexContext } from "@/lib/context/SelectedMealIndexContex";
import { MealPlanFoodItem } from "@/lib/schemas";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PencilIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import AddNotesModal from "../AddNotesModal";
import { TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export interface IAddMealTable {
  mealIndex: number;
  setShowFoodSearchModal: Dispatch<SetStateAction<boolean>>;
  removeMeal: (index: number) => void;
}
const AddMealTable: FC<IAddMealTable> = ({
  mealIndex,
  setShowFoodSearchModal,
  removeMeal,
}) => {
  const [showNotesModal, setShowNotesModal] = useState(false);
  const { control, watch, register } = useFormContext();
  const { value: selectedMealIndex, updateValue: setSelectMealIndex } =
    useMealIndexContext();

  const { remove } = useFieldArray({
    control,
    name: `meals[${mealIndex}].foods`,
  });

  const foodList = watch(`meals[${mealIndex}].foods`);
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div className="my-4 shadow-lg p-2 lg:p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between">
        <div className="flex border-b-2 border-black p-1 focus-within:border-indigo-500 mx-auto">
          <input
            type="text"
            defaultValue={`Meal ${mealIndex + 1}`}
            {...register(`meals[${mealIndex}].name`)}
            className="focus:outline-none w-14 lg:w-72 text-sm lg:text-xl"
          />
          <PencilIcon className="w-4 ml-2 text-gray-400" />
        </div>
        <button
          onClick={() => setShowNotesModal(true)}
          className="text-gro-pink lg:text-white lg:bg-gro-pink lg:px-2 lg:pt-0.5 flex rounded-md"
        >
          {isMobile ? null : <p className="mt-1">Notes</p>}
          <ChatBubbleOvalLeftEllipsisIcon className="w-8 lg:ml-2" />
        </button>
        <AddNotesModal open={showNotesModal} setOpen={setShowNotesModal} />
      </div>

      <div className="mt-2 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 border-none lg:border">
                {!isMobile ? (
                  <thead className="">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-2.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Food Name
                      </th>
                      {isMobile ? null : (
                        <>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Net Protein
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Net Total Fats
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Net Total Carbs
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Net Calories
                          </th>
                        </>
                      )}
                      <th
                        scope="col"
                        className="relative py-3.5 pr-1 sm:pr-6 flex"
                      >
                        <button
                          onClick={() => removeMeal(mealIndex)}
                          className={clsx(
                            mealIndex === 0 && "hidden",
                            "p-2 bg-gray-500 ml-auto text-white rounded-md",
                          )}
                        >
                          {isMobile ? (
                            <TrashIcon className="w-4" />
                          ) : (
                            "Delete Meal"
                          )}
                        </button>
                      </th>
                    </tr>
                  </thead>
                ) : null}

                <tbody className="divide-y divide-gray-200 bg-white">
                  {foodList?.map((f: MealPlanFoodItem, idx: number) => (
                    <tr key={idx}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <p>{f.food.name}</p>
                        {f.food.brand && (
                          <p className="text-sm text-gray-200">
                            {f.food.brand}
                          </p>
                        )}
                      </td>
                      {isMobile ? null : (
                        <>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {f.nutrients.protein * f.serving_quantity}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {f.nutrients.total_fat * f.serving_quantity}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {f.nutrients.total_carbs * f.serving_quantity}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {f.nutrients.calories * f.serving_quantity}
                          </td>
                        </>
                      )}
                      <td className="relative whitespace-nowrap py-2 pr-2 text-right text-sm font-medium">
                        <button
                          onClick={() => remove(idx)}
                          className="text-white p-2 bg-red-500 rounded-md"
                        >
                          <TrashIcon className="w-4" />
                          <span className="sr-only">, {f.food.name}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={7} className="py-4 text-center">
                      <div className="text-center">
                        <button
                          type="button"
                          className="inline-flex items-center px-4  py-1 lg:py-2 border border-transparent text-sm lg:text-base font-medium rounded-md shadow-sm text-white bg-gro-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => {
                            setSelectMealIndex(mealIndex);
                            setShowFoodSearchModal(true);
                          }}
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
