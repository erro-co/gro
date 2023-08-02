import { Dispatch, FC, Fragment, SetStateAction } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Serving } from "@/lib/schemas";
import { ServingWithId } from "../../AddFoodMetaDataForm";

export interface IAddFoodServingInput {
  servings: Serving[];
  selectedServing: ServingWithId | undefined;
  setSelectedServing: Dispatch<SetStateAction<ServingWithId | undefined>>;
}

const AddFoodServingInput: FC<IAddFoodServingInput> = ({
  servings,
  selectedServing,
  setSelectedServing,
}) => {
  return (
    <Listbox
      value={selectedServing}
      onChange={(value) => {
        setSelectedServing(value);
      }}
    >
      {({ open }) => (
        <div className="relative w-32 lg:w-96">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <span className="block truncate">{servings[0].name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {servings.map((item: Serving, idx: number) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    clsx(
                      active ? "bg-indigo-600 text-white" : "text-gray-900",
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                    )
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={clsx(
                          selected ? "font-semibold" : "font-normal",
                          "block truncate",
                        )}
                      >
                        {item.name}
                      </span>

                      {selected ? (
                        <span
                          className={clsx(
                            active ? "text-white" : "text-indigo-600",
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default AddFoodServingInput;
