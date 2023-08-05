"use client";
import Loading from "@/components/Loading";
import { MealIndexProvider } from "@/lib/context/SelectedMealIndexContext";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { Meal, newMealPlanSchema } from "@/lib/schemas";
import { Database } from "@/lib/types/supabase";
import {
  CheckIcon,
  PencilIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import AddFoodModal from "./AddFoodModal";
import AddMealTable from "./AddMealTable";
import AssignUserToPlan from "./AssignUserToPlan";
import ConfirmationModal from "./ConfirmationModal";

type views = "creatPlan" | "loading" | "assignPlan" | "success";

const AddNewMealPlan: FC = () => {
  const [showFoodSearchModal, setShowFoodSearchModal] =
    useState<boolean>(false);
  const { control, watch, register, handleSubmit, reset } = useFormContext();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [showLoading, setShowLoading] = useState(false);
  const [view, setView] = useState<views>("creatPlan");
  const [planId, setPlanId] = useState<number | null>(null);
  const supabase = createClientComponentClient<Database>();

  const mealPlan = watch();

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
    setView("loading");

    const { data: trainer } = await supabase.auth.getUser();

    const { data: new_meal_plan, error: new_meal_plan_error } = await supabase
      .from("meal_plan")
      .insert([
        {
          name: data.name,
          template: false,
          // trainer: trainer?.user?.id,
        },
      ])
      .select();
    if (new_meal_plan_error) {
      console.error("Error inserting food:", new_meal_plan_error);
      return;
    }
    console.log("New meal plan:", new_meal_plan);

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
    console.log("New meals:", new_meals);

    function getMealIdByName(meals: any[], newMeal: Meal) {
      const meal = meals.find((m) => m.name === newMeal.name);
      if (!meal) {
        console.error(`Could not find meal with name ${newMeal.name}`);
        return null;
      }
      return meal.id;
    }

    for (const meal of data.meals) {
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

        console.log("New food:", new_food);

        const {
          data: meal_plan_food_serving_user,
          error: meal_plan_food_serving_user_error,
        } = await supabase
          .from("meal_plan_food_serving_user")
          .insert({
            meal_plan: new_meal_plan[0].id,
            meal_food_serving: new_food[0].id,
          })
          .select("*");
        if (meal_plan_food_serving_user_error) {
          console.error(
            "Error inserting food:",
            meal_plan_food_serving_user_error,
          );
          return;
        }
        console.log("New food_serving_user:", meal_plan_food_serving_user);
      }
    }

    reset();
    setView("assignPlan");
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("role") === "client"
    ) {
      redirect("/dashboard/plans");
    }
  }, []);

  switch (view) {
    case "creatPlan":
      return (
        <>
          <ConfirmationModal isOpen={showLoading} setIsOpen={setShowLoading} />
          <form
            className="flex flex-col h-full"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                    onClick={() =>
                      append({ name: `Meal ${fields.length + 1}` })
                    }
                    className="bg-gro-indigo text-white flex p-2 rounded-md"
                  >
                    <PlusCircleIcon className="w-6" />
                    {isMobile ? (
                      <p className="my-auto text-xs mx-2">Meal</p>
                    ) : (
                      <p className="my-auto text-xs lg:text-base mx-2">
                        Add Meal
                      </p>
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-auto flex w-full mb-4">
                {validateForm(mealPlan) ? (
                  <button
                    type="submit"
                    className="mx-auto flex border px-4 py-2 lg:py-4 rounded-md  text-white bg-green-500 disabled:opacity-70"
                  >
                    {isMobile ? <p>Create</p> : <p> Create Meal Plan</p>}

                    <div className="ml-2">
                      <CheckIcon className="w-6" />
                    </div>
                  </button>
                ) : null}
              </div>
            </MealIndexProvider>
          </form>
        </>
      );
    case "loading":
      return <Loading />;
    case "assignPlan":
      return <AssignUserToPlan planId={planId} />;
    case "success":
      return <></>;
    default:
      return <></>;
  }
};

export default AddNewMealPlan;
