import { FC } from "react";

const AddFood = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <form className="-mx-4 mt-10 pb-4 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg space-y-4">
        <h2 className="text-xl font-medium p-4">New food</h2>
        <div className="grid grid-cols-3 gap-4 p-4">
          <Input label="Name" type="text" placeholder="food name" />
          <Input label="Brand" type="text" placeholder="brand" />
          <Input label="Category" type="text" placeholder="category" />
          <Input label="Protein" type="text" placeholder="Protein" />
          <Input label="Fats" type="text" placeholder="Fats" />
          <Input label="Carbs" type="text" placeholder="Carbohydrates" />
          <Input label="Calories" type="text" placeholder="calories" />
        </div>
        <button className="bg-pink-500 text-white m-4 p-2 my-10 rounded-md">
          Add food
        </button>
      </form>
    </div>
  );
};

export default AddFood;

export interface InputProps {
  placeholder: string;
  label: string;
  type: string;
}

const Input: FC<InputProps> = ({ placeholder, label, type }) => {
  return (
    <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-gray-300 ring-inset focus-within:ring-indigo-500">
      <label htmlFor="name" className="block text-xs font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type}
        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
};
