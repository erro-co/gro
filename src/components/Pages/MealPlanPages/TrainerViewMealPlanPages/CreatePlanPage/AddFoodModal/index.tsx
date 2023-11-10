import { groupAndSummarizeMealsByNutrition } from "@/lib/helpers";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import AddFoodMetaDataForm from "../AddFoodMetaDataForm";
import FoodSearchBar from "../FoodSearchBar";
import FoodSearchHitsTable from "../FoodSearchHitsTable";

export interface IAddFoodModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddFoodModal: FC<IAddFoodModal> = ({ open, setOpen }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [templateMeals, setTemplateMeals] = useState<
    MealFormattedWithSummary[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    Food | MealFormattedWithSummary | null
  >(null);
  const supabase = createClientComponentClient<Database>();

  const methods = useFormContext();

  const meals = methods.watch("meals");

  const fetchTemplateMealsWithFoods = async () => {
    try {
      const { data: template_meals, error: template_meals_error } =
        await supabase
          .from("template_meal_food_serving")
          .select("meal(*), quantity, serving(*), food(*, food_category(*))");
      console.log(
        "template_meals",
        groupAndSummarizeMealsByNutrition(template_meals as any),
      );
      if (template_meals_error) {
        console.error("Failed to fetch template meals:", template_meals_error);
      }
      setTemplateMeals(
        groupAndSummarizeMealsByNutrition(template_meals as any),
      );
    } catch (error) {
      console.error("Failed to fetch template meals:", error);
    }
  };

  const fetchAllFoods = async () => {
    const query = supabase
      .from("food")
      .select()
      .filter("name", "ilike", `%${searchTerm}%`)
      .range(0, 7);
    const { data: all_foods, error } = await query;
    if (error) {
      console.log("Failed to fetch error:", error);
    }

    setFoods(all_foods as Food[]);
    setDataFetched(true);
  };

  useEffect(() => {
    fetchTemplateMealsWithFoods();
    fetchAllFoods();
  }, [searchTerm]);

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
          <div className="fixed z-100 inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-2 lg:inset-12 z-50 overflow-y-auto rounded-lg">
          <div className="flex">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white pb-4 pt-5 text-left shadow-xl transition-all w-full lg:max-w-6xl mx-auto px-4 lg:px-8">
                <div className="absolute right-0 top-0 pr-4 pt-4 sm:block">
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
                    templateMeals={templateMeals}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                ) : null}
                {selectedItem ? (
                  <AddFoodMetaDataForm
                    selectedItem={selectedItem}
                    meals={meals}
                    setOpen={setOpen}
                    setSelectedItem={setSelectedItem}
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
