import { FoodItem } from "@/lib/types";
import { FC, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import FoodNutrientsPieChart from "@/components/Charts/FoodNutrientsPieChart";
import { Nutrition } from "@/lib/schemas";

export interface IAddFoodMetaDataForm {
  selectedFood: FoodItem | null;
}

const AddFoodMetaDataForm: FC<IAddFoodMetaDataForm> = ({ selectedFood }) => {
  const [nutrients, setNutrients] = useState<Nutrition | null>(null); // [protein, carbs, fat]
  const getSelectedFoodMacros = async () => {
    if (selectedFood) {
      const { data: macros, error } = await supabase
        .from("nutrients")
        .select("*")
        .eq("food_id", selectedFood.id);

      if (error) {
        console.log("Failed to fetch error:", error);
        return;
      } else if (macros && macros.length > 0) {
        console.log("test");
        setNutrients(macros[0] as Nutrition);
      }
    }
  };

  useEffect(() => {
    getSelectedFoodMacros();
  }, [selectedFood]);

  return (
    <div className="mx-12 w-full flex my-4 space-x-4">
      <div className="p-4 border border-gray-100 shadow-lg">
        <FoodNutrientsPieChart nutrients={nutrients} />
      </div>
      <div>
        <div className="flex grow w-full p-4 border border-gray-100 shadow-lg">
          <h1 className="text-2xl font-semibold mb-12">Add Food</h1>
          <input type="text" />
        </div>
      </div>
    </div>
  );
};

export default AddFoodMetaDataForm;
