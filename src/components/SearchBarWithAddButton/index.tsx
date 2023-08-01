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
      <div className="shadow-sm border border-input placeholder:text-muted-foreground focus:outline-none focus:ring-1 flex bg-white rounded-lg w-full focus-within:border-gro-indigo">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className={
            "rounded-l-lg pl-2 border-none focus:outline-none border-transparent focus:border-transparent focus:ring-0 grow bg-white text-sm"
          }
        />
        <div className="my-auto pr-2">
          <MagnifyingGlassIcon className="text-gray-500 w-4" />
        </div>
      </div>
      {button}
    </div>
  );
};

export default SearchBarWithAddButton;
