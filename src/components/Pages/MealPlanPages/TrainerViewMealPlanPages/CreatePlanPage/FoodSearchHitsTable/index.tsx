import clsx from "clsx";
import { Dispatch, FC, SetStateAction, useEffect } from "react";

export interface IFoodSearchHitsTable {
  foods: Food[];
  templateMeals: MealFormattedWithSummary[];
  selectedItem: Food | MealFormattedWithSummary | null;
  setSelectedItem: Dispatch<
    SetStateAction<Food | MealFormattedWithSummary | null>
  >;
}

const FoodSearchHitsTable: FC<IFoodSearchHitsTable> = ({
  foods,
  templateMeals,
  selectedItem,
  setSelectedItem,
}) => {
  const mergedData = [
    ...foods.map((food) => ({ ...food, type: "food", id: food.id })),
    ...templateMeals.map((meal) => ({
      ...meal,
      type: "meal",
      brand: "MEAL TEMPLATE",
      id: meal.id,
    })),
  ];

  useEffect(() => {
    console.log("Selected Item", selectedItem);
    console.log("Merged Data", mergedData);
  }, [selectedItem]);

  return (
    <div className="w-full">
      <div className="flow-root">
        <div className="">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gro-pink/50">
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
                      Brand/Type
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mergedData.map((item, idx) => (
                    <tr
                      key={idx}
                      className={clsx(
                        selectedItem?.id === item.id
                          ? "bg-pink-300 text-white"
                          : "hover:bg-gray-200 ",
                      )}
                      onClick={() => {
                        setSelectedItem(
                          selectedItem?.id === item.id ? null : item,
                        );
                      }}
                    >
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-light text-gray-900 sm:pl-6">
                        {item.name}
                      </td>
                      <td
                        className={clsx(
                          selectedItem === item ? " text-black" : "",
                          "whitespace-nowrap py-2 text-sm text-gray-500",
                        )}
                      >
                        <div
                          className={clsx(
                            selectedItem?.id === item.id ? " bg-gray-300" : "",
                            item.brand === "MEAL TEMPLATE"
                              ? "font-semibold bg-gro-pink text-white p-1 w-32 rounded-md"
                              : "",
                          )}
                        >
                          {item.brand ? item.brand : "generic"}
                        </div>
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
