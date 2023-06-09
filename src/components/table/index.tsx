"use client";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import LoadingIcon from "../icons/LoadingIcon";
import Link from "next/link";
import EditFoodModal from "../Modals/EditFoodModal";
import { FoodWithNutrientsAndServing } from "@/lib/schemas";
import clsx from "clsx";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import useMediaQuery from "@/lib/hooks/useMediaQuery";

const PAGE_SIZE = 10;

export default function Table() {
  const [foods, setFoods] = useState<any[]>([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [openEditFoodModal, setOpenEditFoodModal] = useState(false);
  const [selectedFood, setSelectedFood] =
    useState<FoodWithNutrientsAndServing | null>(null);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const getAllFoods = async (page: number) => {
    const offset = (page - 1) * PAGE_SIZE;
    const { data, error } = await supabase
      .from("food")
      .select(`*, nutrients(*, food_id)`)
      .ilike("name", `%${searchTerm}%`)
      .range(offset, offset + PAGE_SIZE - 1)
      .order("name", { ascending: true });

    if (error) {
      console.log("Failed to fetch error:", error);
    }

    setFoods(data as any);
    setDataFetched(true);
  };

  useEffect(() => {
    getAllFoods(currentPage);
  }, [currentPage, searchTerm]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const editFood = (food: FoodWithNutrientsAndServing) => {
    setOpenEditFoodModal(true);
    setSelectedFood(food);
  };

  if (!dataFetched)
    return (
      <div className="w-40 mx-auto mt-20">
        <LoadingIcon />
      </div>
    );

  return (
    <>
      <EditFoodModal
        isOpen={openEditFoodModal}
        setIsOpen={setOpenEditFoodModal}
        food={selectedFood}
      />
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="flex my-4">
          <div className="border border-gray-300 flex bg-white rounded-lg flex-col w-full mx-auto">
            <div className="flex w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search food..."
                className={clsx(
                  "rounded-l-lg",
                  "pl-2 py-2 border-none focus:outline-none border-transparent focus:border-transparent focus:ring-0 grow bg-white",
                )}
              />
              <div className="my-auto pr-2">
                <MagnifyingGlassIcon className="text-gray-500 w-6" />
              </div>
            </div>
          </div>
          <Link href="/dashboard/foods/add" className="">
            <div className="bg-gro-pink text-white p-2 rounded-md flex whitespace-nowrap ml-2">
              <p className="my-auto hidden lg:block">New plan</p>
              <PlusCircleIcon className="w-7 m-0 lg:ml-1 my-auto" />
            </div>
          </Link>
        </div>

        <div className="flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <a href="#" className="group inline-flex">
                          Food Name
                          <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                            <ChevronDownIcon
                              className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                              aria-hidden="true"
                            />
                          </span>
                        </a>
                      </th>
                      {!isMobile ? (
                        <>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Brand
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Protein
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Fats
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Carbs
                          </th>
                        </>
                      ) : null}
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Calories
                      </th>
                      {!isMobile ? (
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {foods?.map((f: FoodWithNutrientsAndServing, idx) => (
                      <tr key={idx}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {f.name}
                          {isMobile ? (
                            <p className="text-gray-400 font-light">
                              {f.brand}
                            </p>
                          ) : null}
                        </td>
                        {!isMobile ? (
                          <>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <p>{f.brand}</p>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {f.nutrients?.protein}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {f.nutrients?.saturated_fat +
                                f.nutrients?.trans_fat}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {f.nutrients?.fiber + f.nutrients?.sugar}
                            </td>
                          </>
                        ) : null}

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {f.nutrients?.calories}
                        </td>
                        {!isMobile ? (
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              onClick={() => editFood(f)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                          </td>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-3">
          <div className="lg:ml-auto flex justify-between">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="bg-gro-indigo disabled:bg-gray-500 text-white font-bold py-2 rounded flex w-28"
            >
              <span className="mx-auto flex">
                <ChevronLeftIcon className="w-6" /> Previous
              </span>
            </button>
            <button
              onClick={handleNextPage}
              disabled={foods.length < PAGE_SIZE}
              className="bg-gro-indigo text-white font-bold py-2 rounded flex w-28"
            >
              <span className="mx-auto flex">
                Next <ChevronLeftIcon className="w-6 rotate-180" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
