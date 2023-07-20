import { Food } from "@/lib/types";
import clsx from "clsx";
import { Dispatch, FC, SetStateAction } from "react";

export interface IFoodSearchHitsTable {
  foods: Food[];
  selectedFood: Food | null;
  setSelectedFood: Dispatch<SetStateAction<Food | null>>;
}

const FoodSearchHitsTable: FC<IFoodSearchHitsTable> = ({
  foods,
  selectedFood,
  setSelectedFood,
}) => {
  return (
    <div className="w-full">
      <div className="flow-root">
        <div className="">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className=" w-full py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="pr-20 py-2 text-left text-sm font-semibold text-gray-900"
                    >
                      Brand
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {foods?.map((food: Food, idx: number) => (
                    <tr
                      key={idx}
                      className={clsx(
                        selectedFood === food
                          ? "bg-pink-300 text-white"
                          : "hover:bg-gray-200 ",
                      )}
                      onClick={() =>
                        setSelectedFood(selectedFood === food ? null : food)
                      }
                    >
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {food.name}
                      </td>
                      <td
                        className={clsx(
                          selectedFood === food ? " text-black" : "",
                          "whitespace-nowrap py-2 text-sm text-gray-500",
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
