"use client";
import AddNotesModal from "@/components/Pages/MealPlanPages/TrainerViewMealPlanPages/CreatePlanPage/AddNotesModal";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Dispatch, FC, SetStateAction } from "react";
import useAddMealTable from "./hooks/useAddMealTable";

export interface IAddMealTable {
  setShowFoodSearchModal: Dispatch<SetStateAction<boolean>>;
}
const AddMealTable: FC<IAddMealTable> = ({ setShowFoodSearchModal }) => {
  const {
    showNotesModal,
    setShowNotesModal,
    isMobile,
    foodList,
    handleAddFood,
    handleAddNote,
    remove,
  } = useAddMealTable({ setShowFoodSearchModal });
  return (
    <div className="my-4">
      <div className="flex justify-between">
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
                          Serving
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
                      </>
                    )}
                    <th scope="col" className="relative py-2 flex"></th>
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
                            {f.serving_quantity} x {f.serving.name} {"("}
                            {Number(
                              f.serving.weight * f.serving_quantity,
                            ).toFixed()}
                            {"g)"}
                          </td>
                          <td className="whitespace-nowrap py-1 text-sm text-gray-500">
                            {Number(
                              f.serving_quantity *
                                (f.serving.weight / 100) *
                                f.food.calories,
                            ).toFixed(1)}
                          </td>
                          <td className="whitespace-nowrap py-1 text-sm text-gray-500">
                            {Number(
                              f.serving_quantity *
                                (f.serving.weight / 100) *
                                f.food.protein,
                            ).toFixed(1)}
                          </td>
                          <td className="whitespace-nowrap py-1 text-sm text-gray-500">
                            {Number(
                              f.serving_quantity *
                                (f.serving.weight / 100) *
                                f.food.total_fat,
                            ).toFixed(1)}
                          </td>
                          <td className="whitespace-nowrap py-1 text-sm text-gray-500 rounded-br-lg">
                            {Number(
                              f.serving_quantity *
                                (f.serving.weight / 100) *
                                f.food.total_carbohydrate,
                            ).toFixed(1)}
                          </td>
                        </>
                      )}
                      <td className="relative whitespace-nowrap pt-1 pr-2 text-right text-sm font-medium">
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
                        <DropdownMenuContent className="bg-white p-2 border rounded-lg mt-0.5 space-y-2 px-4">
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={(_e) => handleAddFood()}
                          >
                            Add Food
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={handleAddNote}
                          >
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
