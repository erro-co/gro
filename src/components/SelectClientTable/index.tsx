"use client";
import Link from "next/link";
import clsx from "clsx";
import { FC } from "react";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Client } from "../Pages/SelectClientMPPage";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

enum ClientStatus {
  Complete = "Active",
  InProgress = "In progress",
  Archived = "Archived",
}

const statuses: Record<ClientStatus, string> = {
  [ClientStatus.Complete]: "text-green-700 bg-green-50 ring-green-600/20",
  [ClientStatus.InProgress]: "text-gray-600 bg-gray-50 ring-gray-500/10",
  [ClientStatus.Archived]: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
};

export interface ISelectClientList {
  clients: Client[];
}

const SelectClientList: FC<ISelectClientList> = ({ clients }) => {
  return (
    <div className="mt-4 mx-auto rounded-lg border border-gray-200 shadow-lg p-4 w-full lg:w-2/3">
      <ul role="list" className="divide-y divide-gray-100">
        {clients?.map((client: Client, idx: number) => (
          <li
            key={idx}
            className="flex items-center justify-between gap-x-6 py-3 lg:py-5"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {capitalizeFirstLetter(client.first_name)}{" "}
                  {capitalizeFirstLetter(client.last_name)}
                </p>
                <p
                  className={clsx(
                    "text-green-700 bg-green-50 ring-green-600/20",
                    "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                  )}
                >
                  Active
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                {/* <p className="whitespace-nowrap">
                  Joined {new Date(client.created_at).toLocaleDateString()}
                </p> */}
                {client.trainer ? (
                  <>
                    {/* <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                      <circle cx={1} cy={1} r={1} />
                    </svg> */}
                    <p className="truncate">
                      Trainer:{" "}
                      {capitalizeFirstLetter(client.trainer.first_name)}{" "}
                      {capitalizeFirstLetter(client.trainer.last_name)}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <Link
                href={"#"}
                className="flex rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Assign
                <PlusCircleIcon className="text-gro-indigo h-5 w-5 ml-1" />
                <span className="sr-only">, {client.first_name}</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectClientList;
