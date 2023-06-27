"use client";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { FC, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import LoadingIcon from "../icons/LoadingIcon";
import Link from "next/link";
import EditFoodModal from "../Modals/EditFoodModal";
import { FoodWithNutrientsAndServing } from "@/lib/schemas";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import SearchBarWithAddButton from "../SearchBarWithAddButton";

const PAGE_SIZE = 10;

const AddFoodButton: FC = () => {
  return (
    <Link href="/dashboard/foods/add">
      <div className="bg-gro-pink text-white p-2 rounded-lg flex whitespace-nowrap ml-2">
        <p className="my-auto hidden lg:block">New Food</p>
        <PlusCircleIcon className="w-7 m-0 lg:ml-1 my-auto" />
      </div>
    </Link>
  );
};

type ReturnedFood = FoodWithNutrientsAndServing & {
  id: number;
};
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

  const handleDeleteFood = async (id: number) => {
    const { error } = await supabase.from("food").delete().match({ id: id });
    if (error) {
      console.log("Failed to delete food:", error);
    }
    getAllFoods(currentPage);
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
      <SearchBarWithAddButton
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search for food..."
        button={<AddFoodButton />}
      />

      <div className="mt-2">
        <div className="flow-root">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="">
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
                    <th scope="col" className="">
                      <span className="sr-only">Delete</span>
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
                  {foods?.map((f: ReturnedFood, idx) => (
                    <tr key={idx}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {f.name}
                        {isMobile ? (
                          <p className="text-gray-400 font-light">{f.brand}</p>
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
                      <td className="relative whitespace-nowrap py-2 pr-2 text-right text-sm font-medium">
                        <button
                          onClick={(e) => handleDeleteFood(f.id)}
                          className="text-white p-2 bg-red-500 rounded-md"
                        >
                          <TrashIcon className="w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-full mt-3 pb-4">
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
