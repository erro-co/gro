"use client";
import { supabase } from "@/lib/supabase";
import { FoodItem } from "@/lib/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, FC, ChangeEvent } from "react";
import clsx from "clsx";
import AddNewFoodTable from "./AddPlanFoodTable";

const AddMealPlanPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [foodTableData, setFoodTableData] = useState<FoodItem[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const addData = (food: FoodItem) => {
    setFoodTableData([...foodTableData, food]);
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
    <div className="space-y-20">
      <div className="shadow-lg w-full rounded-lg">
        {/**  Add new plan */}
        <h1 className="text-base py-24">Add new plan</h1>
        <button>
          <PlusCircleIcon className="w-20" />
        </button>
      </div>
      <div>
        <h2>Meal 1</h2>
        <div className="mb-24">
          <AddNewFoodTable foods={foodTableData} />
        </div>

        <div className="border border-gray-300 flex bg-white rounded-lg flex-col">
          <div className="flex">
            <input
              type="text"
              placeholder="Search food..."
              value={searchTerm}
              onChange={handleChange}
              className={clsx(
                searchTerm ? "rounded-tl-lg" : "rounded-l-lg",
                "pl-2 py-2 border-none focus:outline-none border-transparent focus:border-transparent focus:ring-0 flex-grow",
              )}
            />
            <button onClick={search} className="px-2">
              <MagnifyingGlassIcon className="text-gray-500 w-6" />
            </button>
          </div>

          {searchResults.length > 0 && (
            <div>
              {searchResults.map((food) => (
                <button
                  key={food.id}
                  className="flex border-t border-gray-300 w-full"
                  onClick={() => addData(food)}
                >
                  <p className="my-auto ml-2">{food.name}</p>
                  <div
                    className="ml-auto mr-2 my-2"
                    onClick={() => addData(food)}
                  >
                    <PlusCircleIcon className="w-6 text-[#F695A0]" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div>
        {/** 
       Add new meal plan
       */}
      </div>
      <div>
        {/** 
       Add another meal plan 
       */}
      </div>{" "}
      <div>
        {/** 
  Submit plan and send to client
       */}
      </div>
    </div>
  );
};

export default AddMealPlanPage;
