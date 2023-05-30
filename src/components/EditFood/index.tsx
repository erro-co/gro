import React, { useEffect, useState } from "react";
import NutritionFactsInput from "../NutritionFactsInput";
import ComboboxInput from "../forms/AddNewFood/ComboBoxInput";
import { FoodCategory } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { useFormContext } from "react-hook-form";

const EditFood = () => {
  const { register } = useFormContext();
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [showSuccessfulAddNewFoodModal, setShowSuccessfulAddNewFoodModal] =
    useState(false);
  const [selectedFoodCategory, setSelectedFoodCategory] =
    useState<FoodCategory | null>(null);

  const fetchFoodCategories = async () => {
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
  return (
    <form className="flex">
      <div className="ml-4 mr-24">
        <label htmlFor="name">Food Name</label>
        <input
          {...register("name")}
          type="text"
          name="name"
          placeholder="e.g. Coles"
          className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        />
        <label htmlFor="brand">Brand</label>
        <input
          {...register("brand")}
          type="text"
          name="brand"
          placeholder="e.g. Coles"
          className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        />
        <label htmlFor="category">Category</label>
        <ComboboxInput
          categories={foodCategories}
          setSelectedFoodCategory={setSelectedFoodCategory}
          selectedCategory={selectedFoodCategory}
        />
      </div>
      <NutritionFactsInput />
    </form>
  );
};

export default EditFood;
