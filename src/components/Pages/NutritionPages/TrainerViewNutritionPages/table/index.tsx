"use client";
import { ChevronLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { FC, useEffect, useState } from "react";
import EditFoodModal from "../../../../Modals/EditFoodModal";
import { FoodWithNutrientsAndServing } from "@/lib/schemas";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import SearchBarWithAddButton from "../../../../SearchBarWithAddButton";
import { emptyPlaceholderFood } from "@/lib/consts";
import {
  ChevronUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import Loading from "../../../../Loading";
import ConfirmDeleteActionModal from "../../../../Modals/ConfirmDeleteActionModal";
import AddButton from "../../../../SearchBarWithAddButton/AddButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/supabase";

type SortDirection = "ASC" | "DESC" | null;

const PAGE_SIZE = 10;

const SortIcon = (sortDirection: SortDirection) => {
  switch (sortDirection) {
    case "ASC":
      return (
        <div className="bg-gray-100 rounded-lg">
          <ChevronDownIcon className="w-5 m-0 my-auto" />
        </div>
      );
    case "DESC":
      return (
        <div className="bg-gray-100 rounded-lg">
          <ChevronUpIcon className="w-5 m-0 my-auto" />
        </div>
      );
    default:
      return <ChevronUpDownIcon className="w-5 m-0 my-auto" />;
  }
};

type ReturnedFood = FoodWithNutrientsAndServing & {
  id: number;
};

const Table: FC = () => {
  const [foods, setFoods] = useState<ReturnedFood[]>([]);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openEditFoodModal, setOpenEditFoodModal] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] =
    useState<ReturnedFood>(emptyPlaceholderFood);
  const [openConfirmDeleteActionModal, setOpenConfirmDeleteActionModal] =
    useState<boolean>(false);
  const supabase = createClientComponentClient<Database>();

  const isMobile = useMediaQuery("(max-width: 640px)");
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);

  const getAllFoods = async (page: number) => {
    const offset = (page - 1) * PAGE_SIZE;
    const { data, error } = await supabase
      .from("food")
      .select(`*, nutrients(*, food_id), serving(*, food)`)
      .ilike("name", `%${searchTerm}%`)
      .range(offset, offset + PAGE_SIZE - 1)
      .order(sortColumn || "name", {
        ascending: sortDirection !== "DESC",
      });

    if (error) {
      console.error("Failed to fetch error:", error);
    }

    setFoods(data as any);
    setDataFetched(true);
  };
  const handleSortClick = async (column: string) => {
    let newSortDirection: SortDirection = null;
    if (sortDirection === null) {
      newSortDirection = "ASC";
    } else if (sortDirection === "ASC") {
      newSortDirection = "DESC";
    }
    setSortDirection(newSortDirection);
    setSortColumn(column);
  };

  useEffect(() => {
    getAllFoods(currentPage);
  }, [currentPage, searchTerm, sortDirection, sortColumn]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const editFood = (food: ReturnedFood) => {
    setOpenEditFoodModal(true);
    setSelectedFood(food);
  };

  const handleDeleteFood = async (id: number) => {
    const { error } = await supabase.from("food").delete().match({ id: id });
    if (error) {
      console.error("Failed to delete food:", error);
    }
    setSelectedFood(emptyPlaceholderFood);
    setOpenConfirmDeleteActionModal(false);
    getAllFoods(currentPage);
  };

  if (!dataFetched) return <Loading />;

  return (
    <>
      <EditFoodModal
        isOpen={openEditFoodModal}
        setIsOpen={setOpenEditFoodModal}
        food={selectedFood}
      />
      <ConfirmDeleteActionModal
        open={openConfirmDeleteActionModal}
        setOpen={setOpenConfirmDeleteActionModal}
        deleteFunction={() => handleDeleteFood(selectedFood.id)}
      />
      <SearchBarWithAddButton
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search for food..."
        button={<AddButton link="/dashboard/nutrition/add" text="Add Food" />}
      />

      <div className="mt-2">
        <div className="flow-root">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
                    >
                      <button
                        onClick={() => handleSortClick("name")}
                        className="group inline-flex"
                      >
                        Food Name
                        <span className="ml-1 flex-none rounded text-gray-400">
                          {sortColumn === "name"
                            ? SortIcon(sortDirection)
                            : SortIcon(null)}
                        </span>
                      </button>
                    </th>
                    {!isMobile ? (
                      <>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
                        >
                          <button
                            onClick={() => handleSortClick("brand")}
                            className="group inline-flex"
                          >
                            Brand
                            <span className="ml-1 flex-none rounded text-gray-400">
                              {sortColumn === "brand"
                                ? SortIcon(sortDirection)
                                : SortIcon(null)}
                            </span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
                        >
                          Protein (g)
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
                        >
                          Fats (g)
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
                        >
                          Carbs (g)
                        </th>
                      </>
                    ) : null}
                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
                    >
                      Calories (kcal)
                    </th>
                    <th scope="col" className="">
                      <span className="sr-only">Delete</span>
                    </th>

                    {!isMobile ? (
                      <th
                        scope="col"
                        className="relative py-2 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {foods?.map((f: ReturnedFood, idx) => (
                    <tr
                      key={idx}
                      className={clsx(
                        "font-light",
                        idx % 2 !== 0 ? "bg-gray-50" : "",
                      )}
                    >
                      <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                        {f.name}
                        {isMobile ? (
                          <p className="text-gray-400 font-light">{f.brand}</p>
                        ) : null}
                      </td>
                      {!isMobile ? (
                        <>
                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                            <p>{f.brand}</p>
                          </td>
                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                            {f.nutrients?.protein}
                          </td>
                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                            {f.nutrients?.saturated_fat +
                              f.nutrients?.trans_fat}
                          </td>
                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                            {f.nutrients?.fiber + f.nutrients?.sugar}
                          </td>
                        </>
                      ) : null}

                      <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                        {f.nutrients?.calories}
                      </td>

                      {!isMobile ? (
                        <td className="relative whitespace-nowrap py-1 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => editFood(f)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                        </td>
                      ) : null}
                      <td className="relative whitespace-nowrap py-1 pr-2 text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedFood(f);
                            setOpenConfirmDeleteActionModal(true);
                          }}
                          className="text-red-500 pt-1"
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

        {foods.length > PAGE_SIZE ? (
          <div className="w-full mt-3 pb-4">
            <div className="lg:ml-auto flex justify-between lg:justify-center lg:space-x-10">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="bg-gro-indigo disabled:bg-gray-500 text-white font-bold p-2 rounded flex cursor-pointer"
              >
                <span className="mx-auto flex">
                  <ChevronLeftIcon className="w-6" />
                </span>
              </button>
              <button
                onClick={handleNextPage}
                disabled={foods.length < PAGE_SIZE}
                className="bg-gro-indigo text-white font-bold p-2 rounded flex cursor-pointer"
              >
                <span className="mx-auto flex">
                  <ChevronLeftIcon className="w-6 rotate-180" />
                </span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Table;
