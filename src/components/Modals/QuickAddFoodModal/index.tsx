import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import { CheckIcon, PlusIcon } from "@heroicons/react/20/solid";
import WoolworthsIcon from "@/components/icons/WoolworthsIcon";
import LoadingIcon from "@/components/icons/LoadingIcon";
import { isValidWoolworthsUrl } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import axios from "axios";

export interface IQuickAddFoodModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
interface NutritionFacts {
  servingSize: number;
  calories: number;
  protein: number;
  totalFat: number;
  saturatedFat: number;
  carbohydrate: number;
  sugars: number;
  dietaryFibre: number;
  sodium: number;
}

interface NewFood {
  name: string;
  nutritionFacts: NutritionFacts[];
}

const QuickAddFoodModal: FC<IQuickAddFoodModal> = ({ isOpen, setIsOpen }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);
  const { setValue } = useFormContext();

  const handleAddFood = async () => {
    setFetching(true);
    const data = await axios.get(
      `https://gro-api.vercel.app/scrape?q=${inputValue}`,
    );
    setVals(data.data);
    setFetching(false);
    setIsOpen(false);
  };

  const setVals = (newFood: NewFood) => {
    setValue("name", newFood.name);
    setValue("nutrients.calories", newFood.nutritionFacts[1].calories);
    setValue("nutrients.total_fat", newFood.nutritionFacts[1].totalFat);
    setValue("nutrients.saturated_fat", newFood.nutritionFacts[1].saturatedFat);
    setValue("nutrients.trans_fat", 0);
    setValue("nutrients.cholesterol", 0);
    setValue("nutrients.sodium", newFood.nutritionFacts[1].sodium);
    setValue("nutrients.total_carbs", newFood.nutritionFacts[1].carbohydrate);
    setValue("nutrients.fiber", newFood.nutritionFacts[1].dietaryFibre);
    setValue("nutrients.sugar", newFood.nutritionFacts[1].sugars);
    setValue("nutrients.protein", newFood.nutritionFacts[1].protein);
    setValue("nutrients.vitamin_d", 0);
    setValue("nutrients.calcium", 0);
    setValue("nutrients.iron", 0);
    setValue("nutrients.potassium", 0);
  };

  const handleClose = () => {
    setFetching(false);
    setInputValue("");
    setIsOpen(false);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
        <div className="fixed inset-2 lg:inset-56 z-50 rounded-lg">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {fetching ? (
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-full lg:max-w-3xl sm:p-6">
                <div className="mx-auto flex items-center justify-center rounded-full w-40 py-16">
                  <div className="w-40">
                    <LoadingIcon />
                  </div>
                </div>
              </Dialog.Panel>
            ) : (
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all my-40 w-full sm:max-w-3xl mx-auto">
                <div>
                  {inputValue.length > 0 &&
                  inputValue.includes("woolworths.com.au") ? (
                    <div className="mx-auto flex items-center justify-center mb-10">
                      <WoolworthsIcon className="w-56" />
                    </div>
                  ) : (
                    <>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <PlusIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Paste Link to Add Food
                        </Dialog.Title>
                        <div className="mt-2"></div>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <div className="border border-gray-300 rounded-lg flex">
                    <input
                      onChange={(e) => setInputValue(e.target.value)}
                      type="text"
                      name="food-link"
                      className="p-2 pl-4 w-full rounded-lg border-transparent focus:border-transparent focus:ring-0"
                      placeholder="paste link here"
                    />
                    {isValidWoolworthsUrl(inputValue) ? (
                      <div className="w-8 p-1 mx-1 rounded-full bg-green-100 my-auto">
                        <CheckIcon />
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleAddFood}
                  >
                    Add
                  </button>
                </div>
              </Dialog.Panel>
            )}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default QuickAddFoodModal;
