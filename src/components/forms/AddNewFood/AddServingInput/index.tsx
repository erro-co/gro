import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const AddServingInput: FC = () => {
  const { register, watch } = useFormContext();

  const servingName = watch("servingName", "");
  const servingGrams = watch("servingGrams", "");

  const isValueEmpty = (value: any) =>
    value === undefined || value === null || value === "";

  return (
    <div className="mt-2 sm:mt-0 w-fit">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                #
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Measure
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Grams
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="px-3 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900">
                1
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-gray-500">
                <input
                  {...register("servingName")}
                  className="py-1 pl-2"
                  type="text"
                  placeholder="Serving"
                />
              </td>
              <td className="py-2.5 whitespace-nowrap text-sm text-gray-500">
                <input
                  {...register("servingGrams")}
                  className="py-1 pl-2"
                  type="number"
                  placeholder="n/a"
                />
              </td>
              {!isValueEmpty(servingGrams) || !isValueEmpty(servingName) ? (
                <td className="">
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    <XCircleIcon className="w-6 text-red-500" />
                  </button>
                </td>
              ) : null}
            </tr>
            {!isValueEmpty(servingGrams) && !isValueEmpty(servingName) ? (
              <tr>
                <button className="mx-auto py-2">
                  <PlusCircleIcon className="text-green-500 w-10" />
                </button>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddServingInput;
