"use client";
import { useMealIndexContext } from "@/lib/context/SelectedMealIndexContext";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import AddNotesModal from "../AddNotesModal";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { updateValue: setSelectMealIndex } = useMealIndexContext();

  const { remove } = useFieldArray({
    control,
    name: `meals[${mealIndex}].foods`,
  });

  const meals = watch("meals");
  const foodList = watch(`meals[${mealIndex}].foods`);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const handleAddFood = (mealIndex: number) => {
    setSelectMealIndex(mealIndex);
    setShowFoodSearchModal(true);
  };

  const handleAddNote = () => {
    setShowNotesModal(true);
  };

  return (
    <div className="my-4">
      <div className="flex justify-between">
        <div className="flex border border-gray-300 rounded-lg p-1 focus-within:border-gro-indigo">
          <input
            type="text"
            defaultValue={`Meal ${mealIndex + 1}`}
            {...register(`meals[${mealIndex}].name`)}
            className="focus:outline-none w-14 lg:w-56 text-sm lg:text-sm rounded-lg"
          />
          <PencilIcon className="w-4 ml-2 text-gray-400" />
        </div>
        <AddNotesModal open={showNotesModal} setOpen={setShowNotesModal} />
      </div>
      <div className="mt-2 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 border-none lg:border">
                <thead className="">
                  <tr className="">
                    <th
                      scope="col"
                      className="px-3 lg:w-[500px] py-2 text-left text-sm font-semibold text-gray-900"
                    >
                      Food
                    </th>
                    {isMobile ? null : (
                      <>
                        <th
                          scope="col"
                          className="py-2 text-left text-sm font-semibold text-gray-900"
                        >
                          Protein
                        </th>
                        <th
                          scope="col"
                          className="py-2 text-left text-sm font-semibold text-gray-900"
                        >
                          Fats
                        </th>
                        <th
                          scope="col"
                          className="py-2 text-left text-sm font-semibold text-gray-900"
                        >
                          Carbs
                        </th>
                        <th
                          scope="col"
                          className="py-2 text-left text-sm font-semibold text-gray-900"
                        >
                          Calories
                        </th>
                        <th
                          scope="col"
                          className="py-2 text-left text-sm font-semibold text-gray-900"
                        >
                          Serving
                        </th>
                      </>
                    )}
                    <th scope="col" className="relative py-2 flex">
                      <button
                        onClick={() => removeMeal(mealIndex)}
                        className={clsx(
                          meals && meals.length === 1 && "hidden",
                          "text-red-500",
                          "ml-auto mr-2",
                        )}
                      >
                        <TrashIcon className="w-4" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {foodList?.map((f: any, idx: number) => (
                    <tr key={idx} className="font-light">
                      <td className="lg:w-[500px] whitespace-nowrap py-1 px-3 text-sm text-gray-900">
                        <p>{f.food.name}</p>
                        {isMobile ? (
                          <p className="text-xs font-normal text-gray-400">
                            {f.serving_quantity} x {f.serving.name} {"("}
                            {Number(
                              f.serving.weight * f.serving_quantity,
                            ).toFixed()}
                            {"g)"}
                          </p>
                        ) : null}
                        {isMobile ? null : (
                          <p className="text-xs font-normal text-gray-400">
                            {f.food.brand}
                          </p>
                        )}
                      </td>
                      {isMobile ? null : (
                        <>
                          <td className="whitespace-nowrap py-1 text-sm text-gray-500">
                            {Number(
                              (f.food.protein * f.serving_quantity) /
                                f.serving.weight,
                            )}
                          </td>
                          <td className="whitespace-nowrap py-1 text-sm text-gray-500">
                            {Number(
                              (f.food.total_fat * f.serving_quantity) /
                                f.serving.weight,
                            )}
                          </td>
                          <td className="whitespace-nowrap py-1 text-sm text-gray-500">
                            {Number(
                              (f.food.total_carbohydrate * f.serving_quantity) /
                                f.serving.weight,
                            )}
                          </td>
                          <td className="whitespace-nowrap py-1 text-sm text-gray-500">
                            {Number(
                              (f.food.total_carbohydrate * f.serving_quantity) /
                                f.serving.weight,
                            )}
                          </td>
                          <td className="whitespace-nowrap py-1 text-sm text-gray-500">
                            {f.serving_quantity} x {f.serving.name} {"("}
                            {Number(
                              f.serving.weight * f.serving_quantity,
                            ).toFixed()}
                            {"g)"}
                          </td>
                        </>
                      )}
                      <td className="relative whitespace-nowrap py-1 pr-2 text-right text-sm font-medium">
                        <button
                          onClick={() => remove(idx)}
                          className="text-red-500 rounded-md"
                        >
                          <TrashIcon className="w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={7} className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <div className="p-2 mt-1 rounded-lg shadow-sm text-white bg-gro-indigo">
                            <PlusCircleIcon
                              className="w-5"
                              aria-hidden="true"
                            />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={(_e) => handleAddFood(mealIndex)}
                          >
                            Add Food
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={handleAddNote}>
                            Add Note
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
