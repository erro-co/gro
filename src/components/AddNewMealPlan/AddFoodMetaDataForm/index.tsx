import { FoodItem } from "@/lib/types";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import FoodNutrientsPieChart from "@/components/Charts/FoodNutrientsPieChart";
import { Meal, Nutrition, Serving } from "@/lib/schemas";
import AddFoodServingInput from "../Inputs/AddFoodServingInput";
import SelectMealInput from "../Inputs/SelectMealInput";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useMealIndexContext } from "@/lib/context/SelectedMealIndexContex";

export interface IAddFoodMetaDataForm {
  selectedFood: FoodItem | null;
  meals: Meal[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedFood: Dispatch<SetStateAction<FoodItem | null>>;
}

export type ServingWithId = Serving & { id: number };

const AddFoodMetaDataForm: FC<IAddFoodMetaDataForm> = ({
  selectedFood,
  meals,
  setOpen,
  setSelectedFood,
}) => {
  const [nutrients, setNutrients] = useState<Nutrition | null>(null);
  const [servings, setServings] = useState<Serving[]>([]);
  const [selectedServing, setSelectedServing] = useState<ServingWithId>();
  const [loaded, setLoaded] = useState(false);
  const { control } = useFormContext();
  const [servingQuantity, setServingQuantity] = useState(1);
  const { value: selectedMealIndex, updateValue: setSelectMealIndex } =
    useMealIndexContext();
  const { append } = useFieldArray({
    name: `meals.${selectedMealIndex}.foods`,
    control,
  });

  const getSelectedFoodMacros = async () => {
    if (selectedFood) {
      const { data: macros, error } = await supabase
        .from("nutrients")
        .select("*")
        .eq("food_id", selectedFood.id);

      if (error) {
        console.log("Failed to fetch error:", error);
        return;
      } else if (macros && macros.length > 0) {
        console.log("test");
        setNutrients(macros[0] as Nutrition);
      }

      const { data: servings, error: servingsError } = await supabase
        .from("serving")
        .select("*")
        .eq("food", selectedFood.id);

      if (servingsError) {
        console.log("Failed to fetch error:", error);
        return;
      }
      setServings(servings as Serving[]);
      setSelectedServing(servings[0] as ServingWithId);
    }
    setLoaded(true);
  };

  useEffect(() => {
    getSelectedFoodMacros();
  }, [selectedFood]);

  const handleAddfood = () => {
    append({
      food: selectedFood,
      serving: selectedServing,
      serving_quantity: servingQuantity,
      nutrients: nutrients,
    });
    setSelectedFood(null);
    setOpen(false);
  };

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col-reverse lg:flex-row my-4 space-x-6 space-y-4 lg:space-y-0">
      <div className="p-2 border border-gray-100 shadow-md rounded-lg flex">
        <FoodNutrientsPieChart nutrients={nutrients} />
        <div className="ml-12 mt-8 space-y-6">
          <div className="flex">
            <div className="w-6 h-6 rounded-full bg-gro-pink" />
            <p className="mx-4">Protein {nutrients?.protein}g</p>
          </div>
          <div className="flex">
            <div className="w-6 h-6 rounded-full bg-gro-purple" />
            <p className="mx-4">Fats {nutrients?.total_fat}g</p>
          </div>
          <div className="flex">
            <div className="w-6 h-6 rounded-full bg-gro-indigo" />
            <p className="mx-4">Carbs {nutrients?.total_carbs}g</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-gray-100 shadow-md p-4 flex-grow">
        <div className="">
          <h1 className="text-xl lg:text-2xl font-semibold">
            Add - {selectedFood?.name}
          </h1>

          <div className="flex space-x-2 mt-4">
            <p className="my-auto">Serving Size:</p>
            {/* serving amount */}
            <input
              type="number"
              step={0.1}
              className="border border-gray-300 rounded-lg  w-12 lg:w-24 text-right pr-2 my-auto py-1"
              value={servingQuantity}
              onChange={(e) => setServingQuantity(parseFloat(e.target.value))}
            />
            {/* Serving */}
            <AddFoodServingInput
              servings={servings}
              selectedServing={selectedServing}
              setSelectedServing={setSelectedServing}
            />
          </div>
          <div className="flex space-x-2 mt-4">
            <p className="my-auto">Meal:</p>
            <SelectMealInput meals={meals} />
          </div>
        </div>
        <div className="w-full flex">
          <button
            onClick={handleAddfood}
            className="text-white p-2 bg-pink-500 ml-auto rounded-lg mt-4"
          >
            <p>Add Food</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFoodMetaDataForm;
