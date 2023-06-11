import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { FC, ReactNode } from "react";

export interface ISearchBarWithAddButton {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  placeholder: string;
  button?: ReactNode;
}

const SearchBarWithAddButton: FC<ISearchBarWithAddButton> = ({
  searchTerm,
  setSearchTerm,
  placeholder,
  button,
}) => {
  return (
    <div className="flex w-full">
      <div className="border border-gray-100 shadow flex bg-white rounded-lg w-full focus-within:border-gro-indigo">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className={
            "rounded-l-lg pl-2 py-2 border-none focus:outline-none border-transparent focus:border-transparent focus:ring-0 grow bg-white"
          }
        />
        <div className="my-auto pr-2">
          <MagnifyingGlassIcon className="text-gray-500 w-6" />
        </div>
      </div>
      {button}
    </div>
  );
};

export default SearchBarWithAddButton;
