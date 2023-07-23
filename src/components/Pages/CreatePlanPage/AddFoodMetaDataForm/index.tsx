import { Food } from "@/lib/types";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import FoodNutrientsPieChart from "@/components/Charts/FoodNutrientsPieChart";
import { Meal, Nutrition, Serving } from "@/lib/schemas";
import AddFoodServingInput from "../Inputs/AddFoodServingInput";
import SelectMealInput from "../Inputs/SelectMealInput";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useMealIndexContext } from "@/lib/context/SelectedMealIndexContext";
import LoadingIcon from "@/components/icons/LoadingIcon";

export interface IAddFoodMetaDataForm {
  selectedFood: Food | null;
  meals: Meal[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedFood: Dispatch<SetStateAction<Food | null>>;
}

export type ServingWithId = Serving & { id: number };

const nutrientsPercentages = (nutrients: Nutrition) => {
  const { calories, total_carbs, total_fat, protein } = nutrients;
  const total = calories + total_carbs + total_fat + protein;
  return {
    calories: (calories / total) * 100,
    carbs: (total_carbs / total) * 100,
    fat: (total_fat / total) * 100,
    protein: (protein / total) * 100,
  };
};

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
    setLoaded(false);
    if (selectedFood) {
      const { data: macros, error } = await supabase
        .from("nutrients")
        .select("*")
        .eq("food_id", selectedFood.id);

      if (error) {
        console.log("Failed to fetch error:", error);
        return;
      } else if (macros && macros.length > 0) {
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
    return (
      <div className="w-full mt-4">
        <div className="w-32 mx-auto">
          <LoadingIcon />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-lg lg:text-2xl text-center mb-2">
        {selectedFood?.name}
      </h1>
      <div className="w-full flex flex-col items-stretch lg:flex-row mb-2 md:mb-6">
        <div className="w-full min-h-full hidden p-2 border border-gray-100 shadow-md rounded-lg lg:flex">
          <div className="flex mx-auto">
            <FoodNutrientsPieChart
              nutrients={nutrients}
              width={150}
              height={150}
              innerRadius={40}
              text={`${nutrients?.calories}kcal`}
            />
            <div className="ml-12 my-auto text-xl font-light space-y-2">
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-gro-pink" />
                <p className="mx-4">Protein: {nutrients?.protein}g</p>
                <p>
                  (
                  {nutrients
                    ? nutrientsPercentages(nutrients)?.protein.toFixed(0)
                    : 0}
                  %)
                </p>
              </div>
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-gro-purple" />
                <p className="mx-4">Fats: {nutrients?.total_fat}g</p>{" "}
                <p>
                  (
                  {nutrients
                    ? nutrientsPercentages(nutrients)?.fat.toFixed(0)
                    : 0}
                  %)
                </p>
              </div>
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-gro-indigo" />
                <p className="mx-4">Carbs: {nutrients?.total_carbs}g</p>{" "}
                <p>
                  (
                  {nutrients
                    ? nutrientsPercentages(nutrients)?.carbs.toFixed(0)
                    : 0}
                  %)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full min-h-full rounded-lg border border-gray-100 shadow-md px-2">
          <div className="lg:hidden flex border rounded-lg border-gro-indigo justify-around mt-2">
            <FoodNutrientsPieChart
              nutrients={nutrients}
              width={120}
              height={120}
              innerRadius={35}
              text={`${nutrients?.calories}kcal`}
            />
            <div className="space-y-2 text-xs my-auto">
              <div className="flex">
                <div className="w-3 h-3 mt-0.5 rounded-full bg-gro-pink" />
                <p className="mx-4">Protein {nutrients?.protein}g</p>
              </div>
              <div className="flex">
                <div className="w-3 h-3 mt-0.5 rounded-full bg-gro-purple" />
                <p className="mx-4">Fats {nutrients?.total_fat}g</p>
              </div>
              <div className="flex">
                <div className="w-3 h-3 mt-0.5 rounded-full bg-gro-indigo" />
                <p className="mx-4">Carbs {nutrients?.total_carbs}g</p>
              </div>
            </div>
          </div>
          <div className="flex-col mt-4">
            <label className="font-semibold text-sm">Serving Size:</label>
            <div className="flex">
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
          </div>
          <div className="flex-col my-4">
            <label className="font-semibold text-sm">Meal:</label>
            <SelectMealInput meals={meals} />
          </div>
        </div>
      </div>

      <div className="flex w-full">
        <button
          onClick={handleAddfood}
          className=" text-white p-2 md:py-4 md:px-6 bg-pink-500 rounded-lg mx-auto w-full sm:w-fit text-normal lg:text-xl"
        >
          ADD FOOD
        </button>
      </div>
    </div>
  );
};

export default AddFoodMetaDataForm;
