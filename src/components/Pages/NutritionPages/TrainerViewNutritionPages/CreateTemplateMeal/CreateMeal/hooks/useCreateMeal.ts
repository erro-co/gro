import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
const useCreatePlan = () => {
  const [showFoodSearchModal, setShowFoodSearchModal] =
    useState<boolean>(false);
  const { register, handleSubmit, reset } = useFormContext();

  const [showLoading, setShowLoading] = useState(false);
  const [view, setView] = useState<"createMeal" | "loading">("createMeal");
  const supabase = createClientComponentClient<Database>();

  const onSubmit = async (data: any) => {
    console.log(data);
    setView("loading");

    const generateName = (meal: any) => {
      if (meal.name.trim() !== "") {
        return meal.name;
      }
      const foodNames = meal.foods.map((foodItem: any) => foodItem.food.name);
      if (foodNames.length === 1) return foodNames[0];
      const lastItem = foodNames.pop();
      return `${foodNames.join(", ")} and ${lastItem}`;
    };

    const { data: new_template_meal, error: new_template_meal_error } =
      await supabase
        .from("template_meal")
        .insert({
          name: data.name,
          notes: data.notes,
        })
        .select("*");

    if (new_template_meal_error) {
      console.error("Error inserting food_serving:", new_template_meal_error);
      return;
    }

    for (const food of data.foods) {
      const { error: new_meal_food_serving_error } = await supabase
        .from("template_meal_food_serving")
        .insert({
          meal: new_template_meal[0].id,
          food: food.food.id,
          serving: food.serving.id,
          quantity: food.serving_quantity,
        })
        .select("*");

      if (new_meal_food_serving_error) {
        console.error("Error inserting food:", new_meal_food_serving_error);
        return;
      }
    }

    reset();
    setView("createMeal");
  };

  return {
    showFoodSearchModal,
    setShowFoodSearchModal,
    register,
    handleSubmit,
    onSubmit,
    showLoading,
    setShowLoading,
    view,
    setView,
  };
};

export default useCreatePlan;
