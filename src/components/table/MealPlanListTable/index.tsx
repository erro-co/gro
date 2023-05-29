import { MealPlan } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

interface MealPlanWithId extends MealPlan {
  id: number;
}

export default function MealPlanListTable() {
  const [mealPlans, setMealPlans] = useState<MealPlanWithId[]>();

  const getAllMealPlans = async () => {
    const { data: meal_plans, error } = await supabase
      .from("meal_plan")
      .select("*");

    if (error) {
      console.log("Error getting meal plans:", error);
      return;
    }
    setMealPlans(meal_plans as MealPlanWithId[]);
  };

  useEffect(() => {
    getAllMealPlans();
  }, []);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Client
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Template
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Meals
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Select</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {mealPlans?.map((plan: MealPlanWithId, planIdx) => (
              <tr key={planIdx}>
                <td
                  className={clsx(
                    planIdx === 0 ? "" : "border-t border-transparent",
                    "relative py-4 pl-4 pr-3 text-sm sm:pl-6",
                  )}
                >
                  <div className="font-medium text-gray-900">{plan.name}</div>
                </td>
                <td
                  className={clsx(
                    planIdx === 0 ? "" : "border-t border-gray-200",
                    "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell",
                  )}
                >
                  {plan.name}
                </td>
                <td
                  className={clsx(
                    planIdx === 0 ? "" : "border-t border-gray-200",
                    "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell",
                  )}
                >
                  {/* {plan.template ? "Yes" : "No"} */}
                </td>
                <td
                  className={clsx(
                    planIdx === 0 ? "" : "border-t border-gray-200",
                    "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell",
                  )}
                ></td>

                <td
                  className={clsx(
                    planIdx === 0 ? "" : "border-t border-transparent",
                    "relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6",
                  )}
                >
                  <Link href={`/dashboard/plans/${plan.id}`}>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      Select<span className="sr-only">, {plan.name}</span>
                    </button>
                  </Link>
                  {planIdx !== 0 ? (
                    <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" />
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
