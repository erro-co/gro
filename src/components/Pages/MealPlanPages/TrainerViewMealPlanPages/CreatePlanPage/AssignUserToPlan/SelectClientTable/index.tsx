"use client";
import { FC } from "react";
import { capitalizeFirstLetter } from "@/lib/helpers";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Client } from "../index";

export interface ISelectClientList {
  clients: Client[];
  setSelectedClient: (client: Client) => void;
  setShowModal: (showModal: boolean) => void;
}

const SelectClientList: FC<ISelectClientList> = ({
  clients,
  setSelectedClient,
  setShowModal,
}) => {
  const handleAssignUser = (client: Client) => {
    setSelectedClient(client);
    setShowModal(true);
    console.log("Assigning user", client.id);
  };
  return (
    <div className="mt-4 mx-auto rounded-lg border border-gray-200 shadow-lg w-full p-2 lg:w-2/3">
      <ul role="list" className="divide-y divide-gray-100">
        {clients?.map((client: Client, idx: number) => (
          <li
            key={idx}
            className="flex items-center justify-between gap-x-6 py-2"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm leading-6 text-gray-900">
                  {capitalizeFirstLetter(client.first_name)}{" "}
                  {capitalizeFirstLetter(client.last_name)}
                </p>
                {/* <p
                  className={clsx(
                    "text-green-700 bg-green-50 ring-green-600/20",
                    "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                  )}
                >
                  Active
                </p> */}
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <button
                onClick={() => handleAssignUser(client)}
                className="flex rounded-md bg-white px-2 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <p className="hidden lg:block lg:mr-1">Assign</p>
                <PlusCircleIcon className="text-gro-indigo h-5 w-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectClientList;
