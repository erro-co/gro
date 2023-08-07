"use client";
import { capitalizeFirstLetter } from "@/lib/helpers";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

import type { SupabaseClient } from "@supabase/supabase-js";

export interface ISelectClientList {
  clients: User[];
  setSelectedClient: (client: User) => void;
  setShowModal: (showModal: boolean) => void;
  planId: number | null;
  supabase: SupabaseClient;
}

const SelectClientList: FC<ISelectClientList> = ({
  clients,
  setSelectedClient,
  setShowModal,
  planId,
  supabase,
}) => {
  const handleAssignUser = async (client: User) => {
    try {
      const { data: assignedPlan, error } = await supabase
        .from("meal_plan")
        .update({
          user: client.id,
        })
        .eq("id", planId);
    } catch (error) {
      console.error(error);
    }
    setSelectedClient(client);
    setShowModal(true);
  };
  return (
    <div className="mt-4 mx-auto rounded-lg border border-gray-200 shadow-lg w-full p-2 lg:w-2/3">
      <ul role="list" className="divide-y divide-gray-100">
        {clients?.map((client: User, idx: number) => (
          <li
            key={idx}
            className="flex items-center justify-between gap-x-6 py-2"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm leading-6 text-gray-900">
                  {capitalizeFirstLetter(client.first_name)}{" "}
                  {client.last_name && capitalizeFirstLetter(client.last_name)}
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
