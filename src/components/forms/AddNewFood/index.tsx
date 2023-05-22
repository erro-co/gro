"use client";
import NutritionLabelInput from "@/components/NutritionFactsInput";
import { supabase } from "@/lib/supabase";
import { FC, useEffect, useState } from "react";
import LoadingIcon from "@/components/icons/LoadingIcon";
import { FoodCategory } from "@/lib/types";
import ComboboxInput from "./ComboBoxInput";
import { useFormContext } from "react-hook-form";
import AddServingInput from "./AddServingInput";
import SuccessfulAddNewFoodModal from "@/components/Modals/SuccessfulAddNewFoodModal";

const AddNewFoodForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    reset,
  } = useFormContext();
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

  const onSubmit = async (data: any) => {
    console.log({ data });
    reset();
  };
  console.log({ errors });
  if (!dataFetched) {
    return (
      <div className="w-40 mx-auto mt-20">
        <LoadingIcon />
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12 sm:space-y-16">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Add new food
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            This food can be access by all your clients
          </p>
          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="food-name"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Food name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  {...register("foodName")}
                  type="text"
                  name="foodName"
                  placeholder="e.g. Chicken breast"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="food-brand"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Brand
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  {...register("foodBrand")}
                  type="text"
                  name="foodBrand"
                  placeholder="e.g. Coles"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="food-name"
                className=" text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Category
              </label>

              <ComboboxInput
                categories={foodCategories}
                setSelectedFoodCategory={setSelectedFoodCategory}
                selectedCategory={selectedFoodCategory}
              />
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Serving
              </label>
              <AddServingInput />
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Nutrition
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <NutritionLabelInput />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6 pb-12">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={() => {
            setShowSuccessfulAddNewFoodModal(true);
            console.log("test");
          }}
          className="disabled:bg-gray-500 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </button>
      </div>
      <SuccessfulAddNewFoodModal
        isOpen={showSuccessfulAddNewFoodModal}
        setIsOpen={setShowSuccessfulAddNewFoodModal}
      />
    </form>
  );
};

export default AddNewFoodForm;
