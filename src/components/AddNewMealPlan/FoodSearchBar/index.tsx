import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ChangeEvent, FC, Dispatch } from "react";

export interface IFoodSearchBar {
  searchTerm: string;
  setSearchTerm: Dispatch<string>;
}

const FoodSearchBar: FC<IFoodSearchBar> = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="border border-gray-300 flex bg-white rounded-lg flex-col w-11/12 mx-auto mt-4">
      <div className="flex">
        <input
          type="text"
          placeholder="Search food..."
          value={searchTerm}
          onChange={handleChange}
          className={clsx(
            "rounded-l-lg",
            "pl-2 py-4 border-none focus:outline-none border-transparent focus:border-transparent focus:ring-0 flex-grow",
          )}
        />
        <div className="my-auto pr-2">
          <MagnifyingGlassIcon className="text-gray-500 w-6" />
        </div>
      </div>
    </div>
  );
};

export default FoodSearchBar;
