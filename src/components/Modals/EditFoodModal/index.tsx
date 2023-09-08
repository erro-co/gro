import EditFood from "@/components/Pages/NutritionPages/TrainerViewNutritionPages/EditFood";
import { Dialog, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import {
  CompleteFood,
  FoodWithNutrientsAndServingAndIdSchema,
} from "@/lib/schemas";
import { FC, Fragment } from "react";

export interface IEditFoodModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  food: CompleteFood;
}

const EditFoodModal: FC<IEditFoodModal> = ({ isOpen, setIsOpen, food }) => {
  const methods = useForm<CompleteFood>({
    resolver: zodResolver(FoodWithNutrientsAndServingAndIdSchema),
  });

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
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
          <div className="fixed inset-2 lg:inset-20 z-50 overflow-y-hidden rounded-lg">
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 mx-auto">
                  <div>
                    <div className="text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-gray-900 mb-4"
                      >
                        Edit food
                      </Dialog.Title>
                      <FormProvider {...methods}>
                        <EditFood food={food} />
                      </FormProvider>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default EditFoodModal;
