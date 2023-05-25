import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const SearchBarButton = () => {
  return (
    <div className="border border-gray-300 flex bg-white rounded-lg flex-col w-11/12 mx-auto">
      <div className="flex w-full">
        <input
          type="text"
          disabled
          placeholder="Search food..."
          className={clsx(
            "rounded-l-lg",
            "pl-2 py-4 border-none focus:outline-none border-transparent focus:border-transparent focus:ring-0 grow bg-white",
          )}
        />
        <div className="my-auto pr-2">
          <MagnifyingGlassIcon className="text-gray-500 w-6" />
        </div>
      </div>
    </div>
  );
};

export default SearchBarButton;
