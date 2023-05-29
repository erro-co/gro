"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import LoadingIcon from "../../icons/LoadingIcon";
import Tabs from "@/components/Tabs";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import DropdownOptions from "@/components/DropdownOptions";

export const SkeletonLoader = () => (
  <div className="animate-pulse flex space-x-4">
    <div className="flex-1 space-y-4 py-1">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
  </div>
);

export default function DisplayMealTable() {
  const [foods, setFoods] = useState<any[] | null>([]);
  const [dataFetched, setDataFetched] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1000px)");

  const getAllFoods = async () => {
    const { data, error } = await supabase
      .from("food")
      .select(`*, nutrients(*, food_id)`);

    if (error) {
      console.log("Failed to fetch error:", error);
    }

    setFoods(data);
    setDataFetched(true);
  };

  useEffect(() => {
    getAllFoods();
  }, []);

  if (!dataFetched)
    return (
      <div className="w-40 mx-auto mt-20">
        <LoadingIcon />
      </div>
    );

  return (
    <div className="px-2 lg:px-8 py-8">
      <h2 className="pl-1 py-2 text-2xl font-semibold">Meal 2</h2>

      {isMobile ? <DropdownOptions /> : <Tabs />}

      <div className="mt-2 sflow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Food Name
                    </th>
                    {!isMobile ? (
                      <>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Brand
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Protein
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Fats
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Carbs
                        </th>
                      </>
                    ) : null}
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Calories
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {foods?.map((f) => (
                    <tr key={f.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {f.name}
                      </td>

                      {!isMobile ? (
                        <>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {f.brand}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {f.nutrients?.protein}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {f.nutrients?.total_fat}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {f.nutrients?.total_carbs}
                          </td>
                        </>
                      ) : null}

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {f.nutrients?.calories}
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
}
