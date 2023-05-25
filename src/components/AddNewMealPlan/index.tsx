import { FC, useState } from "react";
import SearchBarButton from "./SearchBarButton";
import AddFoodModal from "./AddFoodModal";
import AddMealTable from "./AddMealTable";

import { useFieldArray, useFormContext } from "react-hook-form";
import {
  ChevronRightIcon,
  PencilIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";

const AddNewMealPlan: FC = () => {
  const [showFoodSearchModal, setShowFoodSearchModal] =
    useState<boolean>(false);
  const { control, watch, register } = useFormContext();

  const mealPlan = watch();
  console.log("MP", mealPlan);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "meals",
  });

  return (
    <>
      <AddFoodModal
        open={showFoodSearchModal}
        setOpen={setShowFoodSearchModal}
      />
      <div className="flex flex-col h-full">
        <div className="w-full flex">
          <div className="mx-auto rounded-md border-2 flex p-2 focus-within:border-indigo-500">
            <input
              type="text"
              {...register("name")}
              className="text-2xl font-semibold focus:outline-none"
            />
            <PencilIcon className="w-6 ml-2 text-gray-400" />
          </div>
          <button className="inline-flex border px-2 rounded-md">
            <p className="my-auto font-bold">Create Meal Plan </p>
            <ChevronRightIcon className="w-8 my-auto" />
          </button>
        </div>
        {fields.map((meal, idx) => (
          <AddMealTable
            key={meal.id}
            mealIndex={idx}
            setShowFoodSearchModal={setShowFoodSearchModal}
            removeMeal={remove}
          />
        ))}
        <div className="mb-4">
          <button
            onClick={() => append({ name: `Meal ${fields.length + 1}` })}
            className="bg-pink-400 text-white flex ml-auto mr-8 mt-4 p-2 rounded-md"
          >
            <PlusCircleIcon className="w-6 mr-2" />
            <p className="my-auto">Add Meal</p>
          </button>
        </div>

        <button
          className={clsx(
            fields.length > 2 ? "py-8" : "",
            "mt-auto cursor-pointer",
          )}
          onClick={() => setShowFoodSearchModal(true)}
        >
          <SearchBarButton />
        </button>
      </div>
    </>
  );
};

export default AddNewMealPlan;
