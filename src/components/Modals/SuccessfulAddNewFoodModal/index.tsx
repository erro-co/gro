import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FC, Fragment } from "react";

export interface ISuccessfulAddNewFoodModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SuccessfulAddNewFoodModal: FC<ISuccessfulAddNewFoodModal> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
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

        <div className="fixed inset-2 lg:inset-24 z-50 overflow-y-auto rounded-lg">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-full mx-auto mt-56">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Food added successfully!
                    </Dialog.Title>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <Link
                    href={"/dashboard/nutrition"}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Go back to dashboard
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SuccessfulAddNewFoodModal;
