import { FC, useState } from "react";
import SearchBarButton from "./SearchBarButton";
import AddFoodModal from "./AddFoodModal";
import AddMealTable from "./AddMealTable";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  ChevronRightIcon,
  PencilIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { supabase } from "@/lib/supabase";
import { Meal, newMealPlanSchema } from "@/lib/schemas";

const AddNewMealPlan: FC = () => {
  const [showFoodSearchModal, setShowFoodSearchModal] =
    useState<boolean>(false);
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

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
        const { error: new_meal_food_serving_error } = await supabase
          .from("meal_food_serving")
          .insert({
            meal: getMealIdByName(new_meals, meal),
            food: food.food,
            serving: food.serving_id,
            quantity: food.serving_quantity,
            template: false,
          })
          .select();
        if (new_meal_food_serving_error) {
          console.error("Error inserting food:", new_meal_food_serving_error);
          return;
        }
        console.log("new_meal_food_serving", new_meal_food_serving_error);
      }
    });

    // reset();
    // setShowSuccessfulAddNewFoodModal(true);
  };

  return (
    <form className="flex flex-col h-full" onSubmit={handleSubmit(onSubmit)}>
      <AddFoodModal
        open={showFoodSearchModal}
        setOpen={setShowFoodSearchModal}
      />
      <div className="w-full flex">
        <div className="mx-auto rounded-md border-2 flex p-2 focus-within:border-indigo-500">
          <input
            type="text"
            {...register("name")}
            className="text-2xl font-semibold focus:outline-none"
          />
          <PencilIcon className="w-6 ml-2 text-gray-400" />
        </div>
        <button
          onClick={() => console.log("clicked")}
          type="submit"
          className="inline-flex border px-2 rounded-md"
        >
          <p className="my-auto font-bold">Create Meal Plan </p>
          <ChevronRightIcon className="w-8 my-auto" />
        </button>
      </div>
      {fields.map((meal, idx) => (
        <AddMealTable
          key={meal.id}
          mealIndex={idx}
          setShowFoodSearchModal={setShowFoodSearchModal}
          removeMeal={remove}
        />
      ))}
      <div className="mb-4">
        <button
          onClick={() => append({ name: `Meal ${fields.length + 1}` })}
          className="bg-pink-400 text-white flex ml-auto mr-8 mt-4 p-2 rounded-md"
        >
          <PlusCircleIcon className="w-6 mr-2" />
          <p className="my-auto">Add Meal</p>
        </button>
      </div>

      <button
        className={clsx(
          fields.length > 2 ? "py-8" : "",
          "mt-auto cursor-pointer",
        )}
        onClick={() => setShowFoodSearchModal(true)}
      >
        <SearchBarButton />
      </button>
    </form>
  );
};

export default AddNewMealPlan;
