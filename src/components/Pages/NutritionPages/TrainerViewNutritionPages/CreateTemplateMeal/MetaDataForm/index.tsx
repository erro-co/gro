import FoodNutrientsPieChart from "@/components/Charts/FoodNutrientsPieChart";
import AddFoodServingInput from "@/components/Pages/MealPlanPages/TrainerViewMealPlanPages/CreatePlanPage/Inputs/AddFoodServingInput";
import LoadingIcon from "@/components/icons/LoadingIcon";
import { Dispatch, FC, SetStateAction } from "react";
import useFoodMetaData from "./hooks/useFoodMetaData";

export interface IAddFoodMetaDataForm {
  selectedFood: Food | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedFood: Dispatch<SetStateAction<Food | null>>;
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
  selectedFood,
  setOpen,
  setSelectedFood,
}) => {
  const {
    servings,
    selectedServing,
    setSelectedServing,
    loaded,
    servingQuantity,
    setServingQuantity,
    handleAddfood,
  } = useFoodMetaData(selectedFood, setSelectedFood, setOpen);

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
        {selectedFood?.name}
      </h1>
      <div className="w-full flex flex-col items-stretch lg:flex-row mb-2 md:mb-6">
        <div className="w-full min-h-full hidden p-2 border border-gray-100 shadow-md rounded-lg lg:flex">
          <div className="flex mx-auto">
            <FoodNutrientsPieChart
              food={selectedFood}
              width={150}
              height={150}
              innerRadius={40}
              text={`${
                selectedFood?.calories &&
                selectedServing?.weight &&
                Number(
                  servingQuantity *
                    (selectedServing.weight / 100) *
                    selectedFood.calories,
                ).toFixed(0)
              }kcal`}
            />
            <div className="ml-12 my-auto text-xl font-light space-y-2">
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-gro-pink" />
                <p className="mx-4">
                  Protein:{" "}
                  {selectedFood?.protein &&
                    selectedServing?.weight &&
                    Number(
                      servingQuantity *
                        (selectedServing.weight / 100) *
                        selectedFood.protein,
                    ).toFixed(1)}
                  g
                </p>
                <p>
                  (
                  {selectedFood
                    ? nutrientsPercentages(selectedFood)?.protein.toFixed(0)
                    : 0}
                  %)
                </p>
              </div>
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-gro-purple" />
                <p className="mx-4">
                  Fats:{" "}
                  {selectedFood?.total_fat &&
                    selectedServing?.weight &&
                    Number(
                      servingQuantity *
                        (selectedServing.weight / 100) *
                        selectedFood.total_fat,
                    ).toFixed(1)}
                  g
                </p>{" "}
                <p>
                  (
                  {selectedFood
                    ? nutrientsPercentages(selectedFood)?.total_fat.toFixed(0)
                    : 0}
                  %)
                </p>
              </div>
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-gro-indigo" />
                <p className="mx-4">
                  Carbs:{" "}
                  {selectedFood?.total_carbohydrate &&
                    selectedServing?.weight &&
                    Number(
                      servingQuantity *
                        (selectedServing.weight / 100) *
                        selectedFood.total_carbohydrate,
                    ).toFixed(1)}
                  g
                </p>{" "}
                <p>
                  (
                  {selectedFood
                    ? nutrientsPercentages(selectedFood)?.carbs.toFixed(0)
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
              food={selectedFood}
              width={120}
              height={120}
              innerRadius={35}
              text={`${
                selectedFood?.calories &&
                selectedServing?.weight &&
                Number(
                  servingQuantity *
                    (selectedServing.weight / 100) *
                    selectedFood.calories,
                ).toFixed(0)
              }kcal`}
            />
            <div className="space-y-2 text-xs my-auto">
              <div className="flex">
                <div className="w-3 h-3 mt-0.5 rounded-full bg-gro-pink" />
                <p className="mx-4">
                  Protein{" "}
                  {selectedFood?.protein &&
                    selectedServing?.weight &&
                    Number(
                      servingQuantity *
                        (selectedServing.weight / 100) *
                        selectedFood.protein,
                    ).toFixed(1)}
                  g
                </p>
              </div>
              <div className="flex">
                <div className="w-3 h-3 mt-0.5 rounded-full bg-gro-purple" />
                <p className="mx-4">
                  Fats{" "}
                  {selectedFood?.total_fat &&
                    selectedServing?.weight &&
                    Number(
                      servingQuantity *
                        (selectedServing.weight / 100) *
                        selectedFood.total_fat,
                    ).toFixed(1)}
                  g
                </p>
              </div>
              <div className="flex">
                <div className="w-3 h-3 mt-0.5 rounded-full bg-gro-indigo" />
                <p className="mx-4">
                  Carbs{" "}
                  {selectedFood?.total_carbohydrate &&
                    selectedServing?.weight &&
                    Number(
                      servingQuantity *
                        (selectedServing.weight / 100) *
                        selectedFood.total_carbohydrate,
                    ).toFixed(1)}
                  g
                </p>
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
