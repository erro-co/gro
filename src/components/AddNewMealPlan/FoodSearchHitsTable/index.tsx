import { FoodCategory, FoodItem } from "@/lib/types";
import clsx from "clsx";
import { Dispatch, FC, SetStateAction } from "react";

export interface IFoodSearchHitsTable {
  foods: FoodItem[];
  selectedFood: FoodItem | null;
  setSelectedFood: Dispatch<SetStateAction<FoodItem | null>>;
  foodCategories: FoodCategory[];
  selectedCategory: FoodCategory | null;
  setSelectedCategory: Dispatch<SetStateAction<FoodCategory | null>>;
}

const FoodSearchHitsTable: FC<IFoodSearchHitsTable> = ({
  foods,
  selectedFood,
  setSelectedFood,
  foodCategories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="flex space-x-6 mt-8 mb-4 ml-8">
        {foodCategories?.map((category, idx) => (
          <div key={idx}>
            <button
              className={clsx(
                "border-b-4",
                category.name === selectedCategory?.name
                  ? "border-indigo-500"
                  : "border-transparent",
              )}
              onClick={() => setSelectedCategory(category)}
            >
              {category.name}
            </button>
          </div>
        ))}
      </div>
      <div className="flow-root">
        <div className="">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className=" w-full py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="pr-20 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Brand
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {foods?.map((food: FoodItem, idx: number) => (
                    <tr
                      key={idx}
                      className={clsx(
                        selectedFood === food
                          ? "bg-pink-300 text-white"
                          : "hover:bg-gray-200",
                      )}
                      onClick={() =>
                        setSelectedFood(selectedFood === food ? null : food)
                      }
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {food.name}
                      </td>
                      <td
                        className={clsx(
                          selectedFood === food ? " text-black" : "",
                          "whitespace-nowrap py-4 text-sm text-gray-500",
                        )}
                      >
                        {food.brand ? food.brand : "generic"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodSearchHitsTable;
