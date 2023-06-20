"use client";
import { FC, useState } from "react";

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
import AddFoodModal from "./AddFoodModal";
import AddMealTable from "./AddMealTable";
// import { Pie, PieChart } from "recharts";

// const COLORS = ["#F695A0", "#DC7CDE", "#A351FA"];

const AddNewMealPlan: FC = () => {
  const [showFoodSearchModal, setShowFoodSearchModal] =
    useState<boolean>(false);
  const [mealPlanId, setMealPlanId] = useState<string>("");
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

  console.log("Meal Plan:", mealPlan); // you can also target specific fields by their names
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
    setMealPlanId(new_meal_plan[0].id);
    console.log("new_meal_plan", new_meal_plan);
    console.log("new_meal_plan[0].id", new_meal_plan[0].id);

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
    <form className="flex flex-col h-full" onSubmit={handleSubmit(onSubmit)}>
      <MealIndexProvider>
        <AddFoodModal
          open={showFoodSearchModal}
          setOpen={setShowFoodSearchModal}
        />
        <div className="w-full flex">
          <div className="w-full lg:w-fit lg:mx-auto shadow border border-gray-200 rounded-lg flex p-2 focus-within:border-indigo-500">
            <input
              type="text"
              {...register("name")}
              className="text-normal lg:text-2xl font-semibold focus:outline-none w-full"
            />
            <PencilIcon className="w-6 text-gray-400" />
          </div>
        </div>
        {/* <div className="w-full flex p-2 rounded-lg shadow-lg border border-gray-200">
          <div>
            <PieChart width={30} height={30}>
              <Pie
                data={[
                  {
                    name: "Protein",
                    value: totalMacros.totalProtein,
                  },
                  {
                    name: "Fat",
                    value: totalMacros.totalFat,
                  },
                  {
                    name: "Carbs",
                    value: totalMacros.totalCarbs,
                  },
                ]}
                innerRadius={4}
                outerRadius={14}
                fill="#8884d8"
                paddingAngle={1}
                dataKey="value"
              ></Pie>
            </PieChart>
          </div>
          <div className="flex my-auto mx-2 space-x-2">
            <p>Protein {totalMacros.totalProtein}</p>
            <p>Fats {totalMacros.totalFat}</p>
            <p>Carbs {totalMacros.totalCarbs}</p>
          </div>
        </div> */}
        {fields.map((meal, idx) => (
          <AddMealTable
            key={meal.id}
            mealIndex={idx}
            setShowFoodSearchModal={setShowFoodSearchModal}
            removeMeal={remove}
          />
        ))}
        <div className="flex">
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
        <div className="mt-auto flex w-full">
          {validateForm(mealPlan) ? (
            <button
              type="submit"
              className="mx-auto flex border px-4 py-2 lg:py-4 rounded-md  text-white bg-green-500 disabled:opacity-70"
            >
              {isMobile ? <p>Create</p> : <p> Create Meal Plan</p>}
              <CheckIcon className="w-6" />
            </button>
          ) : (
            <button
              disabled
              className="flex border px-4 py-2 lg:py-4 rounded-md mx-auto text-white bg-red-500 disabled:opacity-70"
            >
              {isMobile ? <p>Create</p> : <p> Create Meal Plan</p>}
              <XMarkIcon className="w-6" />
            </button>
          )}
        </div>
      </MealIndexProvider>
    </form>
  );
};

export default AddNewMealPlan;
