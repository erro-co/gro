import {
  CheckCircleIcon,
  PencilSquareIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { FoodWithQuantity } from ".";
export interface IMealTable {
  mealFoods: FoodWithQuantity[];
  setMealFoods?: Dispatch<SetStateAction<FoodWithQuantity[]>>;
}

const MealTable: FC<IMealTable> = ({ mealFoods, setMealFoods }) => {
  const [editMealHeading, setEditMealHeading] = useState(false);
  const [mealName, setMealName] = useState("Meal");
  const inputRef = useRef<HTMLInputElement>(null);

  if (mealFoods.length === 0)
    return (
      <>
        <div className="mt-10 mb-5">
          {editMealHeading ? (
            <div className="flex">
              <input
                ref={inputRef}
                placeholder={mealName}
                className="border border-gray-300 rounded-md p-1"
              />

              <button onClick={() => setEditMealHeading(false)}>
                <XCircleIcon className="w-8 text-red-500" />
              </button>
              <button
                onClick={() => {
                  if (inputRef.current) {
                    setMealName(inputRef.current.value);
                  }
                  setEditMealHeading(false);
                }}
              >
                <CheckCircleIcon className="w-8 text-green-500" />
              </button>
            </div>
          ) : (
            <button className="flex" onClick={() => setEditMealHeading(true)}>
              <h2 className="text-xl font-medium">{mealName}</h2>
              <PencilSquareIcon className="w-6 my-auto ml-1 mb-1 text-gray-400" />
            </button>
          )}
        </div>

        <table className="">
          <thead className="w-full border-b-4 border-black">
            <th className="w-full">Food</th>
            <th className="pr-6 lg:pr-20">Protein</th>
            <th className="pr-6 lg:pr-20">Fats</th>
            <th className="pr-6 lg:pr-20">Carbs</th>
            <th className="pr-6 lg:pr-20">Calories</th>
            <th className="pr-40">Serving</th>
            <th className="sr-only">Clear</th>
          </thead>
        </table>
        <div className="mb-24 w-full">
          <p className="text-center pt-4">Add foods from search bar below</p>
        </div>
      </>
    );

  return (
    <table className="mt-10 mb-24">
      <thead className="w-full border-b-4 border-black">
        <th className="w-full">Food</th>
        <th className="pr-6 lg:pr-20">Protein</th>
        <th className="pr-6 lg:pr-20">Fats</th>
        <th className="pr-6 lg:pr-20">Carbs</th>
        <th className="pr-6 lg:pr-20">Calories</th>
        <th className="pr-40">Serving</th>
        <th className="sr-only">Clear</th>
      </thead>
      <tbody>
        {mealFoods?.map((item, idx) => (
          <tr key={idx}>
            <td className="whitespace-nowrap py-2 text-md font-medium text-gray-900">
              <p>{item.food.name}</p>
              <p className="text-sm font-extralight text-gray-400">
                {item.food.brand}
              </p>
            </td>
            <td>{item.food.protein}</td>
            <td>{item.food.fats}</td>
            <td>{item.food.carbs}</td>
            <td>{item.food.calories}</td>
            <td>
              {item.quantity} {item.quantityType}
            </td>
            <td>
              <button
                onClick={() => {
                  if (!setMealFoods) return;
                  const updatedFoods = mealFoods.filter(
                    (_, index) => index !== idx,
                  );
                  setMealFoods(updatedFoods);
                }}
                className="my-2"
              >
                <XCircleIcon className="w-8 h-8 text-red-500" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MealTable;
