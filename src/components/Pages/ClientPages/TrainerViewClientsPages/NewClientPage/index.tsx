"use client";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { redirect } from "next/navigation";

const NewClientPage: FC = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  if (
    typeof window !== "undefined" ||
    localStorage.getItem("role") !== "trainer" ||
    localStorage.getItem("role") !== "admin"
  ) {
    redirect("/dashboard/plans");
  }

  return (
    <form>
      <div className="space-y-12 sm:space-y-16">
        <div>
          <div className="flex w-full">
            <div className="mx-auto">
              <UserPlusIcon className="w-32" />
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Add new Client
              </h2>
            </div>
          </div>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="food-name"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                First name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  type="text"
                  name="firstname"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="food-brand"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Last Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  type="text"
                  name="lastname"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="food-brand"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Email
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="food-brand"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Phone
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="phone"
                  name="phone"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6 pb-12">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="disabled:bg-gray-500 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default NewClientPage;
