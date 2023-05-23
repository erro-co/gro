import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ChangeEvent, FC, useEffect, useState, Dispatch } from "react";
import { FoodItem } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { FoodWithQuantity } from "../forms/AddMeal";

export interface IFoodSearchBar {
  setMealFoods: Dispatch<React.SetStateAction<FoodWithQuantity[]>>;
  mealFoods: FoodWithQuantity[];
}

const FoodSearchBar: FC<IFoodSearchBar> = ({ mealFoods, setMealFoods }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const addData = (food: FoodItem) => {
    const addedFood: FoodWithQuantity = {
      food: food,
      quantity: 100,
      quantityType: "grams",
    };
    setMealFoods([...mealFoods, addedFood]);
    setSearchResults([]);
    setSearchTerm("");
  };

  const search = async () => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    const { data, error } = await supabase
      .from("food")
      .select("*")
      .ilike("name", `%${searchTerm}%`);

    if (error) {
      console.error("Error searching:", error);
      return;
    }

    setSearchResults((data as FoodItem[]) || []);
  };

  useEffect(() => {
    search();
  }, [searchTerm]);
  return (
    <div className="border border-gray-300 flex bg-white rounded-lg flex-col w-11/12 mx-auto mt-4">
      <div className="flex">
        <input
          type="text"
          placeholder="Search food..."
          value={searchTerm}
          onChange={handleChange}
          className={clsx(
            searchTerm && searchResults.length > 0
              ? "rounded-tl-lg"
              : "rounded-l-lg",
            "pl-2 py-4 border-none focus:outline-none border-transparent focus:border-transparent focus:ring-0 flex-grow",
          )}
        />
        <button onClick={search} className="px-2">
          <MagnifyingGlassIcon className="text-gray-500 w-6" />
        </button>
      </div>

      {searchResults.length > 0 && (
        <div>
          {searchResults.map((food: FoodItem) => (
            <button
              key={food.id}
              className="flex border-t border-gray-300 w-full"
              onClick={() => addData(food)}
            >
              <p className="my-auto mx-2">{food.name}</p>
              <p className="my-auto text-light text-gray-400">{food.brand}</p>
              <div className="ml-auto mr-2 my-2" onClick={() => addData(food)}>
                <PlusCircleIcon className="w-6 text-[#F695A0]" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodSearchBar;
