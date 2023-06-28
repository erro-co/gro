import { FC, useEffect, useState } from "react";
import NutritionFactsInput from "../NutritionFactsInput";
import ComboboxInput from "../forms/AddNewFood/ComboBoxInput";
import { FoodCategory } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { useFormContext } from "react-hook-form";
import AddServingInput from "../forms/AddNewFood/AddServingInput";
import { FoodWithNutrientsAndServing } from "@/lib/schemas";

export interface IEditFood {
  food: FoodWithNutrientsAndServing;
}

const EditFood: FC<IEditFood> = ({ food }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [showSuccessfulAddNewFoodModal, setShowSuccessfulAddNewFoodModal] =
    useState(false);
  const [selectedFoodCategory, setSelectedFoodCategory] =
    useState<FoodCategory | null>(null);

  const fetchFoodCategories = async () => {
    setDataFetched(false);
    const { data: food_category, error } = await supabase
      .from("food_category")
      .select("*");

    if (error) {
      console.log("Failed to fetch error:", error);
    }
    setFoodCategories((food_category as FoodCategory[]) || []);
    setDataFetched(true);
  };

  useEffect(() => {
    fetchFoodCategories();
  }, []);

  useEffect(() => {
    setValue("name", food?.name);
    setValue("brand", food?.brand);
    setValue("food_category", food?.food_category);
    setValue("serving", food?.serving);
    setValue("nutrients", food?.nutrients);
  }, [food]);

  const onSubmit = async (data: any) => {
    console.log("data");
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="flex justify-evenly">
        <div className="ml-4 space-y-4">
          <div>
            <label htmlFor="name">Food Name</label>
            <input
              {...register("name")}
              type="text"
              name="name"
              placeholder="e.g. Coles"
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label htmlFor="brand">Brand</label>
            <input
              {...register("brand")}
              type="text"
              name="brand"
              placeholder="e.g. Coles"
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <ComboboxInput
              categories={foodCategories}
              setSelectedFoodCategory={setSelectedFoodCategory}
              selectedCategory={selectedFoodCategory}
            />
          </div>
          <div>
            <label htmlFor="serving">Serving</label>
            <AddServingInput />
          </div>
        </div>
        <NutritionFactsInput />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-gro-indigo rounded-lg text-white font-bold mt-4"
      >
        Update food
      </button>
    </form>
  );
};

export default EditFood;
