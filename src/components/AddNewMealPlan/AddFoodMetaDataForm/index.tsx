import { FoodItem } from "@/lib/types";
import { FC, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import FoodNutrientsPieChart from "@/components/Charts/FoodNutrientsPieChart";
import { Nutrition, Serving } from "@/lib/schemas";

export interface IAddFoodMetaDataForm {
  selectedFood: FoodItem | null;
}

const AddFoodMetaDataForm: FC<IAddFoodMetaDataForm> = ({ selectedFood }) => {
  const [nutrients, setNutrients] = useState<Nutrition | null>(null);
  const [servings, setServings] = useState<Serving[]>([]);
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

      const { data: servings, error: servingsError } = await supabase
        .from("serving")
        .select("*")
        .eq("food", selectedFood.id);

      if (error) {
        console.log("Failed to fetch error:", error);
        return;
      }
      setServings(servings as Serving[]);
    }
  };

  useEffect(() => {
    getSelectedFoodMacros();
  }, [selectedFood]);

  return (
    <div className="w-full flex my-4 space-x-4 mx-20">
      <div className="p-4 border border-gray-100 shadow-md h-64 flex rounded-lg">
        <FoodNutrientsPieChart nutrients={nutrients} />
        <div>
          <p>Protein</p>
          <p>{nutrients?.protein} grams</p>
        </div>
      </div>
      <div className="rounded-lg border border-gray-100 shadow-md p-4 flex">
        <div className="flex">
          <h1 className="text-2xl font-semibold mb-12">Add Food</h1>
          <select name="serving" placeholder="test">
            {servings?.map((serve, idx) => (
              <option key={idx} className="flex" placeholder="select a serving">
                <p className="font-semibold">{serve.name}</p>{" "}
                <p>{serve.weight} grams</p>
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AddFoodMetaDataForm;
