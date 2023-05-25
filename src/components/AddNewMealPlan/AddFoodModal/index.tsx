import {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FoodSearchBar from "../FoodSearchBar";
import FoodSearchHitsTable from "../FoodSearchHitsTable";
import { supabase } from "@/lib/supabase";
import { FoodCategory, FoodItem } from "@/lib/types";
import AddFoodMetaDataForm from "../AddFoodMetaDataForm";
import { useFormContext } from "react-hook-form";

export interface IAddFoodModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddFoodModal: FC<IAddFoodModal> = ({ open, setOpen }) => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([
    { id: 0, name: "All", created_at: null },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | null>(
    null,
  );
  const { register, watch } = useFormContext();

  const meals = watch("meals");
  console.log("meals: ", meals);

  const fetchAllFoods = async () => {
    let query = supabase
      .from("food")
      .select()
      .filter("name", "ilike", `%${searchTerm}%`);
    if (selectedCategory && selectedCategory.id !== 0) {
      query = query.filter("food_category", "eq", selectedCategory.id);
    }
    const { data: all_foods, error } = await query;
    if (error) {
      console.log("Failed to fetch error:", error);
    }

    setFoods(all_foods as FoodItem[]);
    setDataFetched(true);
  };

  const fetchFoodCategory = async () => {
    const { data: food_categories, error } = await supabase
      .from("food_category")
      .select("*");

    if (error) {
      console.log("Failed to fetch error:", error);
    }
    setFoodCategories([
      ...foodCategories,
      ...(food_categories as FoodCategory[]),
    ]);
    setSelectedCategory(foodCategories[0]);
  };

  useEffect(() => {
    fetchFoodCategory();
  }, []);

  useEffect(() => {
    fetchAllFoods();
  }, [searchTerm, selectedCategory]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed z-100 inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-2 lg:inset-24 z-50 overflow-y-auto rounded-lg">
          <div className="flex min-h-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white pb-4 pt-5 text-left shadow-xl transition-all w-full px-8">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <h2 className="text-xl font-semibold">Add food to meal</h2>
                <FoodSearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
                {dataFetched ? (
                  <FoodSearchHitsTable
                    foods={foods}
                    selectedFood={selectedFood}
                    setSelectedFood={setSelectedFood}
                    foodCategories={foodCategories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                ) : null}
                {selectedFood ? (
                  <AddFoodMetaDataForm
                    selectedFood={selectedFood}
                    meals={meals}
                    setOpen={setOpen}
                    setSelectedFood={setSelectedFood}
                  />
                ) : null}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddFoodModal;
