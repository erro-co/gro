import { isValueEmpty } from "@/lib/helpers";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const AddServingInput: FC = () => {
  const { control, watch, register } = useFormContext();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "serving",
  });

  const checkIfServingEmpty = (index: number, type: "and" | "or") => {
    const weight: number = watch(`serving.${index}.name`);
    const name: string = watch(`serving.${index}.weight`);
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
    <div className="w-full sm:max-w-xs">
      <div className="shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="divide-y divide-gray-300">
          <thead className="">
            <tr>
              <th
                scope="col"
                className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
              >
                #
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
              >
                Measure
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
              >
                Grams
              </th>
              <th scope="col" className="py-2 pr-1">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {fields.map((field, index: number) => (
              <tr key={field.id}>
                <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                  <input
                    id="serving-name"
                    {...register(`serving.${index}.name`)}
                    className="pl-2 w-full"
                    type="text"
                    placeholder="Serving"
                  />
                </td>
                <td className="py-2 whitespace-nowrap text-sm text-gray-500">
                  <input
                    {...register(`serving.${index}.weight`, {
                      valueAsNumber: true,
                    })}
                    className="pl-2 w-16"
                    type="number"
                    placeholder="n/a"
                    id="serving-weight"
                  />
                </td>
                <td className="flex py-2">
                  {checkIfServingEmpty(index, "or") ? (
                    <button onClick={() => handleClear(index)} className="">
                      <XMarkIcon className="w-6 text-red-500" />
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {checkIfServingEmpty(fields.length - 1, "and") ? (
          <div className="flex border-t">
            <button
              className="py-1 mx-auto"
              onClick={() => append({ name: undefined, weight: undefined })}
            >
              <PlusCircleIcon className="text-gray-500 w-8" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AddServingInput;
