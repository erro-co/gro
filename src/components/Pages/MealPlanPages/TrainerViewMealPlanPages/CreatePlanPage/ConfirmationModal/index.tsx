import LoadingIcon from "@/components/icons/LoadingIcon";
import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";

export interface ISuccessfulAddNewFoodModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ConfirmationModal: FC<ISuccessfulAddNewFoodModal> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClose={setIsOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white py-12 text-left shadow-xl transition-all w-full max-w-lg">
            <div>
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full">
                <LoadingIcon />
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default ConfirmationModal;
