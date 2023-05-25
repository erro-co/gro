import { FC, useEffect, useState } from "react";
import SearchBarButton from "./SearchBarButton";
import AddFoodModal from "./AddFoodModal";
import AddMealTable from "./AddMealTable";
import { supabase } from "@/lib/supabase";
import { FoodItem } from "@/lib/types";
import { useFieldArray, useFormContext } from "react-hook-form";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/20/solid";

const AddNewMealPlan: FC = () => {
  const [showFoodSearchModal, setShowFoodSearchModal] =
    useState<boolean>(false);

  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const { control, watch, register } = useFormContext();

  const mealPlan = watch();
  console.log(mealPlan);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "meals",
  });

  const fetchAllFoods = async () => {
    const { data: all_foods } = await supabase.from("food").select("*");
    setFoods(all_foods as FoodItem[]);
    setDataFetched(true);
  };

  useEffect(() => {
    fetchAllFoods();
  }, []);

  if (!dataFetched) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AddFoodModal
        open={showFoodSearchModal}
        setOpen={setShowFoodSearchModal}
      />
      <div className="flex flex-col h-full">
        <div className="w-full flex">
          <div className="mx-auto rounded-md border-2 flex p-2">
            <input
              type="text"
              defaultValue={"Meal Plan"}
              className="text-2xl font-semibold focus:ring-0"
            />
            <PencilIcon className="w-6 ml-2 text-gray-400" />
          </div>
        </div>
        {fields.map((meal, idx) => (
          <AddMealTable
            key={meal.id}
            id={idx}
            setShowFoodSearchModal={setShowFoodSearchModal}
          />
        ))}
        <div className="mb-4">
          <button
            onClick={() => append({ name: "" })}
            className="bg-pink-400 text-white flex ml-auto mr-8 mt-4 p-2 rounded-md"
          >
            <PlusCircleIcon className="w-6 mr-2" />
            <p className="my-auto">Add Meal</p>
          </button>
        </div>

        <button
          className="mt-auto cursor-pointer"
          onClick={() => setShowFoodSearchModal(true)}
        >
          <SearchBarButton />
        </button>
      </div>
    </>
  );
};

export default AddNewMealPlan;
