import FoodSearchBar from "@/components/FoodSearchBar";
import { FoodItem } from "@/lib/types";
import { FC, useState } from "react";
import MealTable from "./MealTable";
import { useFormContext } from "react-hook-form";

export interface FoodWithQuantity {
  food: FoodItem;
  quantity: number;
  quantityType?:
    | "grams"
    | "ml"
    | "cups"
    | "tablespoons"
    | "teaspoons"
    | "units";
}

const AddMealForm: FC = () => {
  const [mealFoods, setMealFoods] = useState<FoodWithQuantity[]>([]);

  const { register } = useFormContext();

  return (
    <div className="w-full 2xl:w-2/3 mx-auto">
      <h2 className="font-semibold text-3xl">Add a new meal</h2>
      <MealTable mealFoods={mealFoods} setMealFoods={setMealFoods} />
      {mealFoods.length > 0 ? (
        <div className="w-full flex">
          <button className="text-white p-2 bg-green-500 rounded-md my-4 ml-auto">
            Another meal
          </button>
        </div>
      ) : null}

      <FoodSearchBar setMealFoods={setMealFoods} mealFoods={mealFoods} />
    </div>
  );
};

export default AddMealForm;
