import { convertToBase100 } from "@/lib/helpers";
import { FoodSchema, FoodWithServingSchema } from "@/lib/schemas";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

const TABLE_FOOD = "food";
const TABLE_FOOD_CATEGORY = "food_category";

type FoodWithServingSchemaType = z.infer<typeof FoodWithServingSchema>;

const useAddNewFoodForm = () => {
  const { register, handleSubmit, reset } =
    useFormContext<FoodWithServingSchemaType>();
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessfulAddNewFoodModal, setShowSuccessfulAddNewFoodModal] =
    useState(false);
  const [selectedFoodCategory, setSelectedFoodCategory] =
    useState<FoodCategory | null>(null);
  const [showQuickAddFoodModal, setShowQuickAddFoodModal] = useState(false);

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const fetchFoodCategories = async () => {
      try {
        const { data: food_category, error } = await supabase
          .from(TABLE_FOOD_CATEGORY)
          .select("*");
        if (error) throw error;
        setFoodCategories(food_category || []);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch error:", error);
        setLoading(false);
      }
    };

    fetchFoodCategories();
  }, []);

  const validateForm = (data: FoodWithServingSchemaType) => {
    try {
      FoodSchema.parse(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const onSubmit = async (data: FoodWithServingSchemaType) => {
    if (!validateForm(data)) return;

    const nutrients = convertToBase100(data, data.serving[0].weight);

    try {
      const { data: new_food, error } = await supabase
        .from(TABLE_FOOD)
        .insert([
          {
            name: nutrients.name || "",
            brand: nutrients.brand || "",
            calories: nutrients.calories || 0,
            protein: nutrients.protein || 0,
            total_fat: nutrients.total_fat || 0,
            saturated_fat: nutrients.saturated_fat || 0,
            total_carbohydrate: nutrients.total_carbohydrate || 0,
            fibre: nutrients.fibre || 0,
            sugar: nutrients.sugar || 0,
            category: selectedFoodCategory?.id || "",
            cholesterol: nutrients.cholesterol || 0,
            sodium: nutrients.sodium || 0,
            trans_fat: nutrients.trans_fat || 0,
          },
        ])
        .select();

      if (error) throw error;

      const servingDataWithFood = data.serving.map((s) => ({
        ...s,
        food: new_food?.[0]?.id,
      }));

      const { error: new_serving_error } = await supabase
        .from("serving")
        .insert(servingDataWithFood)
        .select();

      if (new_serving_error) throw new_serving_error;
      reset();
      setShowSuccessfulAddNewFoodModal(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    register,
    handleSubmit,
    foodCategories,
    loading,
    showSuccessfulAddNewFoodModal,
    setShowSuccessfulAddNewFoodModal,
    selectedFoodCategory,
    setSelectedFoodCategory,
    onSubmit,
    showQuickAddFoodModal,
    setShowQuickAddFoodModal,
  };
};

export default useAddNewFoodForm;
