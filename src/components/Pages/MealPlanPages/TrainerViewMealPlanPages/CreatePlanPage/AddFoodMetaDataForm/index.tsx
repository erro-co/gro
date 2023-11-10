import LoadingIcon from "@/components/icons/LoadingIcon";
import { useMealIndexContext } from "@/lib/context/SelectedMealIndexContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import AddFoodServingInput from "../Inputs/AddFoodServingInput";
import SelectMealInput from "../Inputs/SelectMealInput";

export interface IAddFoodMetaDataForm {
  selectedItem: Food | MealFormattedWithSummary | null;
  meals: Meal[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedItem: Dispatch<
    SetStateAction<Food | MealFormattedWithSummary | null>
  >;
}

const nutrientsPercentages = (food: Food | null) => {
  if (!food) {
    return null;
  }
  const { calories, total_carbohydrate, total_fat, protein } = food;
  const total = calories + total_carbohydrate + total_fat + protein;
  return {
    calories: (calories / total) * 100,
    carbs: (total_carbohydrate / total) * 100,
    total_fat: (total_fat / total) * 100,
    protein: (protein / total) * 100,
  };
};

const AddFoodMetaDataForm: FC<IAddFoodMetaDataForm> = ({
  selectedItem,
  meals,
  setOpen,
  setSelectedItem,
}) => {
  const [servings, setServings] = useState<Serving[]>([]);
  const [selectedServing, setSelectedServing] = useState<Serving>();
  const [loaded, setLoaded] = useState(false);
  const { control } = useFormContext();
  const [servingQuantity, setServingQuantity] = useState(1);
  const { value: selectedMealIndex, updateValue: setSelectMealIndex } =
    useMealIndexContext();
  const { append } = useFieldArray({
    name: `meals.${selectedMealIndex}.foods`,
    control,
  });

  const supabase = createClientComponentClient<Database>();

  const getSelectedItemMacros = async () => {
    setLoaded(false);
    if (selectedItem) {
      const { data: servings, error: servingsError } = await supabase
        .from("serving")
        .select("*")
        .eq("food", selectedItem.id);

      if (servingsError) {
        console.log("Failed to fetch error:", servingsError);
        return;
      }
      setServings(servings as Serving[]);
      setSelectedServing(servings[0] as Serving);
    }
    setLoaded(true);
  };

  useEffect(() => {
    getSelectedItemMacros();
  }, [selectedItem]);

  const handleAddfood = () => {
    append({
      food: selectedItem,
      serving: selectedServing,
      serving_quantity: servingQuantity,
    });
    setSelectedItem(null);
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
      <h1 className="text-lg lg:text-xl text-center font-light mt-2 mb-2">
        {selectedItem?.name}
      </h1>
      <div className="w-full flex flex-col items-stretch lg:flex-row mb-2 md:mb-6">
        {/* <div className="w-full min-h-full hidden p-2 border border-gray-100 shadow-md rounded-lg lg:flex">
          <div className="flex mx-auto">
            <FoodNutrientsPieChart
              food={selectedItem}
              width={150}
              height={150}
              innerRadius={40}
              text={`${
                selectedItem?.calories &&
                selectedServing?.weight &&
                Number(
                  servingQuantity *
                    (selectedServing.weight / 100) *
                    selectedItem.calories,
                ).toFixed(0)
              }kcal`}
            />
            <div className="ml-12 my-auto text-xl font-light space-y-2">
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-gro-pink" />
                <p className="mx-4">
                  Protein:{" "}
                  {selectedItem?.protein &&
                    selectedServing?.weight &&
                    Number(
                      servingQuantity *
                        (selectedServing.weight / 100) *
                        selectedItem.protein,
                    ).toFixed(1)}
                  g
                </p>
                <p>
                  (
                  {selectedItem
                    ? nutrientsPercentages(selectedItem)?.protein.toFixed(0)
                    : 0}
                  %)
                </p>
              </div>
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-gro-purple" />
                <p className="mx-4">
                  Fats:{" "}
                  {selectedItem?.total_fat &&
                    selectedServing?.weight &&
                    Number(
                      servingQuantity *
                        (selectedServing.weight / 100) *
                        selectedItem.total_fat,
                    ).toFixed(1)}
                  g
                </p>{" "}
                <p>
                  (
                  {selectedItem
                    ? nutrientsPercentages(selectedItem)?.total_fat.toFixed(0)
                    : 0}
                  %)
                </p>
              </div>
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-gro-indigo" />
                <p className="mx-4">
                  Carbs:{" "}
                  {selectedItem?.total_carbohydrate &&
                    selectedServing?.weight &&
                    Number(
                      servingQuantity *
                        (selectedServing.weight / 100) *
                        selectedItem.total_carbohydrate,
                    ).toFixed(1)}
                  g
                </p>{" "}
                <p>
                  (
                  {selectedItem
                    ? nutrientsPercentages(selectedItem)?.carbs.toFixed(0)
                    : 0}
                  %)
                </p>
              </div>
            </div>
          </div>
        </div> */}

        <div className="w-full min-h-full rounded-lg border border-gray-100 shadow-md px-2">
          {/* <div className="lg:hidden flex border rounded-lg border-gro-indigo justify-around mt-2">
            <FoodNutrientsPieChart
              food={selectedItem}
              width={120}
              height={120}
              innerRadius={35}
              text={`${
                selectedItem?.calories &&
                selectedServing?.weight &&
                Number(
                  servingQuantity *
                    (selectedServing.weight / 100) *
                    selectedItem.calories,
                ).toFixed(0)
              }kcal`}
            />
            <div className="space-y-2 text-xs my-auto">
              <div className="flex">
                <div className="w-3 h-3 mt-0.5 rounded-full bg-gro-pink" />
                <p className="mx-4">
                  Protein{" "}
                  {selectedItem?.protein &&
                    selectedServing?.weight &&
                    Number(
                      servingQuantity *
                        (selectedServing.weight / 100) *
                        selectedItem.protein,
                    ).toFixed(1)}
                  g
                </p>
              </div>
              <div className="flex">
                <div className="w-3 h-3 mt-0.5 rounded-full bg-gro-purple" />
                <p className="mx-4">
                  Fats{" "}
                  {selectedItem?.total_fat &&
                    selectedServing?.weight &&
                    Number(
                      servingQuantity *
                        (selectedServing.weight / 100) *
                        selectedItem.total_fat,
                    ).toFixed(1)}
                  g
                </p>
              </div>
              <div className="flex">
                <div className="w-3 h-3 mt-0.5 rounded-full bg-gro-indigo" />
                <p className="mx-4">
                  Carbs{" "}
                  {selectedItem?.total_carbohydrate &&
                    selectedServing?.weight &&
                    Number(
                      servingQuantity *
                        (selectedServing.weight / 100) *
                        selectedItem.total_carbohydrate,
                    ).toFixed(1)}
                  g
                </p>
              </div>
            </div>
          </div> */}
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
            {meals && <SelectMealInput meals={meals} />}
          </div>
        </div>
      </div>

      <div className="flex w-full">
        <button
          onClick={handleAddfood}
          className=" text-white p-2 md:py-4 md:px-6 bg-gro-indigo rounded-lg mx-auto w-full sm:w-fit text-normal lg:text-xl"
        >
          ADD ITEM
        </button>
      </div>
    </div>
  );
};

export default AddFoodMetaDataForm;
