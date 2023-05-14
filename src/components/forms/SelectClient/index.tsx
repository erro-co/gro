import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { FC } from "react";

export interface ISelectClientForm {
  nextStep: () => void;
}

const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
  },
];

const SelectClientForm: FC<ISelectClientForm> = () => {
  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      {people.map((person) => (
        <li
          key={person.email}
          className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
        >
          <div className="flex gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
                <span className="absolute inset-x-0 -top-px bottom-0" />
                {person.name}
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                {person.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900"></p>
            </div>
            <ChevronRightIcon
              className="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SelectClientForm;
