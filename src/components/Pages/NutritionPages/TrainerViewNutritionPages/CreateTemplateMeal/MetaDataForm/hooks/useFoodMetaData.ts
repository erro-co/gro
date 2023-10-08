// useFoodMetaData.tsx
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const useFoodMetaData = (
  selectedFood: Food | null,
  setSelectedFood: Dispatch<SetStateAction<Food | null>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
) => {
  const [servings, setServings] = useState<Serving[]>([]);
  const [selectedServing, setSelectedServing] = useState<Serving>();
  const [loaded, setLoaded] = useState(false);
  const { control } = useFormContext();
  const [servingQuantity, setServingQuantity] = useState(1);

  const { append } = useFieldArray({
    name: `foods`,
    control,
  });

  const supabase = createClientComponentClient<Database>();

  const getSelectedFoodMacros = async () => {
    setLoaded(false);
    if (selectedFood) {
      const { data: servings, error: servingsError } = await supabase
        .from("serving")
        .select("*")
        .eq("food", selectedFood.id);

      if (servingsError) {
        console.log("Failed to fetch error:", servingsError);
        return;
      }
      setServings(servings as Serving[]);
      setSelectedServing(servings[0] as Serving);
    }
    setLoaded(true);
  };

  useEffect(() => {
    getSelectedFoodMacros();
  }, [selectedFood]);

  const handleAddfood = () => {
    append({
      food: selectedFood,
      serving: selectedServing,
      serving_quantity: servingQuantity,
    });
    setSelectedFood(null);
    setOpen(false);
  };

  return {
    servings,
    selectedServing,
    setSelectedServing,
    loaded,
    servingQuantity,
    setServingQuantity,
    handleAddfood,
  };
};

export default useFoodMetaData;
