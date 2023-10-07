"use client";
import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { ChevronLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Dispatch, FC, SetStateAction } from "react";
import ConfirmDeleteActionModal from "../../../../Modals/ConfirmDeleteActionModal";
import EditFoodModal from "../../../../Modals/EditFoodModal";

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

export interface INutritionTable {
  foods: Food[];
  selectedFood: Food;
  setSelectedFood: Dispatch<SetStateAction<Food>>;
  currentPage: number;
  handleSortClick: (column: string) => void;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  handleDeleteFood: (id: string) => void;
  sortColumn: string;
  sortDirection: SortDirection;
  openEditFoodModal: boolean;
  setOpenEditFoodModal: Dispatch<SetStateAction<boolean>>;
  editFood: (food: Food) => void;
  isMobile: boolean;
  openConfirmDeleteActionModal: boolean;
  setOpenConfirmDeleteActionModal: Dispatch<SetStateAction<boolean>>;
}

const NutritionTable: FC<INutritionTable> = ({
  foods,
  selectedFood,
  setSelectedFood,
  currentPage,
  handleSortClick,
  handleNextPage,
  handlePreviousPage,
  handleDeleteFood,
  sortColumn,
  sortDirection,
  openEditFoodModal,
  setOpenEditFoodModal,
  editFood,
  isMobile,
  openConfirmDeleteActionModal,
  setOpenConfirmDeleteActionModal,
}) => {
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
                  {foods?.map((f: Food, idx) => (
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
                            {f.protein}
                          </td>
                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                            {f.total_fat}
                          </td>
                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                            {f.total_carbohydrate}
                          </td>
                        </>
                      ) : null}

                      <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                        {f.calories}
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

        {foods?.length > PAGE_SIZE ? (
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

export default NutritionTable;
