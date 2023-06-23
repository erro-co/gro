import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { isValueEmpty } from "@/lib/utils";

const AddServingInput: FC = () => {
  const { control, watch, register } = useFormContext();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "servings",
  });

  const checkIfServingEmpty = (index: number, type: "and" | "or") => {
    const weight: number = watch(`servings.${index}.name`);
    const name: string = watch(`servings.${index}.weight`);
    if (type === "and" && !isValueEmpty(weight) && !isValueEmpty(name)) {
      return true;
    } else if (
      type === "or" &&
      (!isValueEmpty(weight) || !isValueEmpty(name))
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleClear = (index: number) => {
    if (index === 0) {
      update(index, { name: "", weight: undefined });
    } else {
      remove(index);
    }
  };

  return (
    <div className="mt-2 sm:mt-0 w-full lg:w-fit">
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
            {fields.map((field, index: number) => (
              <tr key={field.id}>
                <td className="px-3 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-sm text-gray-500">
                  <input
                    id="serving-name"
                    {...register(`servings.${index}.name`)}
                    className="py-1 pl-2"
                    type="text"
                    placeholder="Serving"
                  />
                </td>
                <td className="py-2.5 whitespace-nowrap text-sm text-gray-500">
                  <input
                    {...register(`servings.${index}.weight`, {
                      valueAsNumber: true,
                    })}
                    className="py-1 pl-2"
                    type="number"
                    placeholder="n/a"
                    id="serving-weight"
                  />
                </td>
                {checkIfServingEmpty(index, "or") ? (
                  <td className="flex">
                    <button onClick={() => handleClear(index)} className="">
                      <XCircleIcon className="w-8 text-red-500 mt-2 mx-4" />
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
        {checkIfServingEmpty(fields.length - 1, "and") ? (
          <div className="w-full flex border-t">
            <button
              className="py-2 mx-auto"
              onClick={() => append({ name: undefined, weight: undefined })}
            >
              <PlusCircleIcon className="text-green-500 w-10" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AddServingInput;
