"use client";
import { FC, useState } from "react";
import AddFoodModal from "./AddFoodModal";
import AddMealTable from "./AddMealTable";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  CheckIcon,
  PencilIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { supabase } from "@/lib/supabase";
import { Meal, newMealPlanSchema } from "@/lib/schemas";
import { MealIndexProvider } from "@/lib/context/SelectedMealIndexContex";
import useMediaQuery from "@/lib/hooks/useMediaQuery";

const AddNewMealPlan: FC = () => {
  const [showFoodSearchModal, setShowFoodSearchModal] =
    useState<boolean>(false);
  const {
    control,
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const mealPlan = watch();
  console.log("MP", mealPlan);
  console.log({ errors });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "meals",
  });

  const validateForm = (data: any) => {
    try {
      newMealPlanSchema.parse(data);
      console.log("Valid form");
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

    const { data: new_meal_plan, error: new_meal_plan_error } = await supabase
      .from("meal_plan")
      .insert([
        {
          name: data.name,
          template: false,
        },
      ])
      .select();
    if (new_meal_plan_error) {
      console.error("Error inserting food:", new_meal_plan_error);
      return;
    }
    console.log("new_meal_plan", new_meal_plan);

    const { data: new_meals, error: new_meals_error } = await supabase
      .from("meal")
      .insert(
        data.meals.map((meal: Meal) => ({
          name: meal.name,
        })),
      )
      .select("*");

    if (new_meals_error) {
      console.error("Error inserting food_serving:", new_meals_error);
      return;
    }

    console.log("new_meals", new_meals);

    function getMealIdByName(meals: any[], newMeal: Meal) {
      const meal = meals.find((m) => m.name === newMeal.name);
      if (!meal) {
        console.error(`Could not find meal with name ${newMeal.name}`);
        return null;
      }
      return meal.id;
    }

    data.meals.forEach(async (meal: Meal) => {
      for (const food of meal.foods) {
        const { data: new_food, error: new_meal_food_serving_error } =
          await supabase
            .from("meal_food_serving")
            .insert({
              meal: getMealIdByName(new_meals, meal),
              food: food.food.id,
              serving: food.serving.id,
              quantity: food.serving_quantity,
              template: false,
            })
            .select("*");
        if (new_meal_food_serving_error) {
          console.error("Error inserting food:", new_meal_food_serving_error);
          return;
        }
        console.log("new_meal_food_serving", new_food);

        const {
          data: meal_plan_food_serving_user,
          error: meal_plan_food_serving_user_error,
        } = await supabase
          .from("meal_plan_food_serving_user")
          .insert({
            meal_plan_id: new_meal_plan[0].id,
            meal_food_serving: new_food[0].id,
            user: 2,
          })
          .select();
        if (meal_plan_food_serving_user_error) {
          console.error(
            "Error inserting food:",
            meal_plan_food_serving_user_error,
          );
          return;
        }
        console.log("meal_plan_food_serving", meal_plan_food_serving_user);
      }
    });

    reset();
  };

  return (
    <form className="flex flex-col lg:h-full" onSubmit={handleSubmit(onSubmit)}>
      <MealIndexProvider>
        <AddFoodModal
          open={showFoodSearchModal}
          setOpen={setShowFoodSearchModal}
        />
        <div className="w-full flex">
          <div className="w-full lg:w-fit lg:mx-auto rounded-md border-2 flex p-2 focus-within:border-indigo-500">
            <input
              type="text"
              {...register("name")}
              className="text-normal lg:text-2xl font-semibold focus:outline-none w-full"
            />
            <PencilIcon className="w-6 text-gray-400" />
          </div>
        </div>
        {fields.map((meal, idx) => (
          <AddMealTable
            key={meal.id}
            mealIndex={idx}
            setShowFoodSearchModal={setShowFoodSearchModal}
            removeMeal={remove}
          />
        ))}
        <div className="mb-4 flex">
          <div className="ml-auto flex">
            <button
              onClick={() => append({ name: `Meal ${fields.length + 1}` })}
              className="bg-gro-indigo text-white flex lg:mr-8 mt-1 lg:mt-4 p-1 lg:py-2 rounded-md"
            >
              <PlusCircleIcon className="w-6" />
              {isMobile ? (
                <p className="my-auto text-sm mx-2">Meal</p>
              ) : (
                <p className="my-auto text-sm lg:text-base">Add Meal</p>
              )}
            </button>
          </div>
        </div>

        {validateForm(mealPlan) ? (
          <div className="fixed bottom-0 left-1/2  transform -translate-x-1/2 flex justify-center w-full">
            <button
              type="submit"
              className="absolute bottom-4 flex border px-4 py-2 lg:py-4 rounded-md  text-white bg-green-500 disabled:opacity-70"
            >
              {isMobile ? <p>Create</p> : <p> Create Meal Plan</p>}
              <CheckIcon className="w-6" />
            </button>
          </div>
        ) : (
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center w-full">
            <button
              disabled
              className="absolute bottom-4 flex border px-4 py-2 lg:py-4 rounded-md mx-auto lg:mr-8 text-white bg-red-500 disabled:opacity-70"
            >
              {isMobile ? <p>Create</p> : <p> Create Meal Plan</p>}
              <XMarkIcon className="w-6" />
            </button>
          </div>
        )}
      </MealIndexProvider>
    </form>
  );
};

export default AddNewMealPlan;
