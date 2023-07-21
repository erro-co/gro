"use client";
import { useMealIndexContext } from "@/lib/context/SelectedMealIndexContext";
import { MealPlanFoodItem } from "@/lib/schemas";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
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

  const meals = watch("meals");
  const foodList = watch(`meals[${mealIndex}].foods`);
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div className="my-4">
      <div className="flex justify-between">
        <div className="flex border border-black p-1 focus-within:border-indigo-500">
          <input
            type="text"
            defaultValue={`Meal ${mealIndex + 1}`}
            {...register(`meals[${mealIndex}].name`)}
            className="focus:outline-none w-14 lg:w-56 text-sm lg:text-sm"
          />
          <PencilIcon className="w-4 ml-2 text-gray-400" />
        </div>
        {/* <button
          onClick={() => setShowNotesModal(true)}
          className="text-gro-pink lg:text-white lg:bg-gro-pink lg:px-2 lg:pt-0.5 flex rounded-md"
        >
          {isMobile ? null : <p className="mt-1">Notes</p>}
          <ChatBubbleOvalLeftEllipsisIcon className="w-8 lg:ml-2" />
        </button> */}
        <AddNotesModal open={showNotesModal} setOpen={setShowNotesModal} />
      </div>

      <div className="mt-2 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border">
              <table className="min-w-full divide-y divide-gray-300 border-none lg:border">
                {!isMobile ? (
                  <thead className="">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
                      >
                        Food Name
                      </th>
                      {isMobile ? null : (
                        <>
                          <th
                            scope="col"
                            className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
                          >
                            Net Protein
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
                          >
                            Net Total Fats
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
                          >
                            Net Total Carbs
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
                          >
                            Net Calories
                          </th>
                        </>
                      )}
                      <th scope="col" className="relative py-2 flex">
                        <button
                          onClick={() => removeMeal(mealIndex)}
                          className={clsx(
                            meals && meals.length === 1 && "hidden",
                            "text-red-500",
                          )}
                        >
                          <TrashIcon className="w-4" />
                        </button>
                      </th>
                    </tr>
                  </thead>
                ) : null}

                <tbody className="divide-y divide-gray-200 bg-white">
                  {foodList?.map((f: MealPlanFoodItem, idx: number) => (
                    <tr key={idx} className="font-light">
                      <td className="whitespace-nowrap py-1 px-3 text-sm text-gray-900">
                        <p>{f.food.name}</p>
                        {f.food.brand && (
                          <p className="text-sm font-normal text-gray-400">
                            {f.food.brand}
                          </p>
                        )}
                      </td>
                      {isMobile ? null : (
                        <>
                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                            {f.nutrients.protein * f.serving_quantity}
                          </td>
                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                            {f.nutrients.total_fat * f.serving_quantity}
                          </td>
                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                            {f.nutrients.total_carbs * f.serving_quantity}
                          </td>
                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                            {f.nutrients.calories * f.serving_quantity}
                          </td>
                        </>
                      )}
                      <td className="relative whitespace-nowrap py-1 pr-2 text-right text-sm font-medium">
                        <button
                          onClick={() => remove(idx)}
                          className="text-red-500 p-1 rounded-md"
                        >
                          <TrashIcon className="w-4" />
                          <span className="sr-only">, {f.food.name}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={7} className="py-1 text-center">
                      <button
                        type="button"
                        className="items-center px-2 lg:py-2 border border-transparent text-sm lg:text-base font-medium rounded-md shadow-sm text-white bg-gro-purple"
                        onClick={() => {
                          setSelectMealIndex(mealIndex);
                          setShowFoodSearchModal(true);
                        }}
                      >
                        <PlusCircleIcon
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      </button>
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
