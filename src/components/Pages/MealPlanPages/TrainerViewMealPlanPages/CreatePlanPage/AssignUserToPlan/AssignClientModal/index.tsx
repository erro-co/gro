import { capitalizeFirstLetter } from "@/lib/helpers";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import Link from "next/link";
import { FC, Fragment, useEffect, useState } from "react";
export interface ISuccessfulAddNewFoodModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedClient: User | null;
  planId: string | null;
}

const AssignClientModal: FC<ISuccessfulAddNewFoodModal> = ({
  isOpen,
  setIsOpen,
  selectedClient,
  planId,
}) => {
  const supabase = createClientComponentClient<Database>();
  const [trainer, setTrainer] = useState<User | null>(null);
  const getTrainerFirstName = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("profiles")
      .select()
      .eq("id", user?.id || "");

    data && setTrainer(data[0] as User);
  };
  const sendNotification = () => {
    axios.post("/app/api/send", {
      data: {
        planId: planId,
        firstName: selectedClient?.first_name,
        clientEmail: selectedClient?.email,
        trainerFirstName: trainer?.first_name,
      },
    });
  };

  useEffect(() => {
    getTrainerFirstName();
  }, []);
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
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-2 overflow-y-auto rounded-lg">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-full max-w-xl mx-auto">
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
                      Assigned
                      {selectedClient?.first_name &&
                      selectedClient?.last_name ? (
                        <>
                          {" "}
                          to{" "}
                          {capitalizeFirstLetter(
                            selectedClient?.first_name || "",
                          )}{" "}
                          {capitalizeFirstLetter(
                            selectedClient?.last_name || "",
                          )}{" "}
                        </>
                      ) : null}
                      successfully!
                    </Dialog.Title>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <Link
                    href={"/app/nutrition"}
                    onClick={() => {
                      sendNotification();
                    }}
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Email Plan to{" "}
                    {selectedClient?.first_name
                      ? capitalizeFirstLetter(selectedClient?.first_name || "")
                      : "client"}
                  </Link>
                </div>
                <div className="mt-2">
                  <Link
                    href={"/app/nutrition"}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

export default AssignClientModal;
