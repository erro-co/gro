"use client";
import Loading from "@/components/Loading";
import QuickAddFoodModal from "@/components/Modals/QuickAddFoodModal";
import SuccessfulAddNewFoodModal from "@/components/Modals/SuccessfulAddNewFoodModal";
import NutritionLabelInput from "@/components/NutritionFactsInput";
import { convertToBase100 } from "@/lib/helpers";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { FoodSchema } from "@/lib/schemas";
import { BoltIcon } from "@heroicons/react/20/solid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import AddServingInput from "./AddServingInput";
import ComboboxInput from "./ComboBoxInput";

const AddNewFoodForm: FC = () => {
  const { register, handleSubmit, reset } = useFormContext();
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessfulAddNewFoodModal, setShowSuccessfulAddNewFoodModal] =
    useState(false);
  const [selectedFoodCategory, setSelectedFoodCategory] =
    useState<FoodCategory | null>(null);
  const [showQuickAddFoodModal, setShowQuickAddFoodModal] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const supabase = createClientComponentClient<Database>();

  const fetchFoodCategories = async () => {
    const { data: food_category, error } = await supabase
      .from("food_category")
      .select("*");

    if (error) {
      console.log("Failed to fetch error:", error);
    }
    setFoodCategories((food_category as FoodCategory[]) || []);
    setLoading(false);
  };

  const validateForm = (data: any) => {
    try {
      FoodSchema.parse(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const onSubmit = async (data: any) => {
    if (validateForm(data) === false) {
      return;
    }
    const base100NutrientsWithId = {
      ...convertToBase100(data, data.serving[0].weight),
    };

    const { data: new_food, error } = await supabase
      .from("food")
      .insert([
        {
          name: data.name,
          brand: data.brand,
          category: data.category,
          protein: base100NutrientsWithId.protein,
          total_fat: base100NutrientsWithId.total_fat,
          total_carbohydrate: base100NutrientsWithId.total_carbohydrate,
          sugar: base100NutrientsWithId.sugar,
          sodium: base100NutrientsWithId.sodium,
          fibre: base100NutrientsWithId.fibre,
          cholesterol: base100NutrientsWithId.cholesterol,
          saturated_fat: base100NutrientsWithId.saturated_fat,
          trans_fat: base100NutrientsWithId.trans_fat,
          calories: base100NutrientsWithId.calories,
        },
      ])
      .select();
    if (error) {
      console.error("Error inserting food:", error);
      return;
    }
    const { error: food_serving_error } = await supabase.from("serving").insert(
      data.serving.map((serving: Serving) => ({
        food: new_food[0].id,
        name: serving.name,
        weight: serving.weight,
      })),
    );

    if (food_serving_error) {
      console.error("Error inserting food_serving:", food_serving_error);
      return;
    }

    reset();
    setShowSuccessfulAddNewFoodModal(true);
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("role") === "client"
    ) {
      redirect("/app/plans");
    }
    fetchFoodCategories();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12 sm:space-y-16">
        <div>
          <div className="flex w-full">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Add new food
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                This food can be access by all your clients
              </p>
            </div>

            <div className="ml-auto">
              <QuickAddFoodModal
                isOpen={showQuickAddFoodModal}
                setIsOpen={setShowQuickAddFoodModal}
              />
              <button
                onClick={() => setShowQuickAddFoodModal(true)}
                className="bg-gro-pink p-2 text-white rounded-lg"
              >
                {isMobile ? (
                  <div className="w-8">
                    <BoltIcon />
                  </div>
                ) : (
                  <p>Quick add</p>
                )}
              </button>
            </div>
          </div>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="food-name"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Food name<span className="text-red-500 font-bold">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  {...register("name")}
                  type="text"
                  name="name"
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
                  {...register("brand")}
                  type="text"
                  name="brand"
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
                Category<span className="text-red-500 font-bold">*</span>
              </label>
              <ComboboxInput
                categories={foodCategories}
                setSelectedFoodCategory={setSelectedFoodCategory}
                selectedCategory={selectedFoodCategory}
              />
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="serving"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Serving<span className="text-red-500 font-bold">*</span>
              </label>
              <AddServingInput />
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="nutrition"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Nutrition<span className="text-red-500 font-bold">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <NutritionLabelInput />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6 pb-12">
        <Link
          href={"/app/nutrition"}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="disabled:bg-gray-500 inline-flex justify-center rounded-md bg-gro-pink px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
