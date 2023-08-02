import { ArrowRightCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { FC, useState } from "react";
import { MealPlan } from "@/lib/types";
import { parseSupabaseDate } from "@/lib/helpers";
import { supabase } from "@/lib/supabase";
import ConfirmDeleteActionModal from "@/components/Modals/ConfirmDeleteActionModal";
import { emptyPlaceholderMealPlan } from "@/lib/consts";

export interface IMealPlanListTable {
  mealPlans: MealPlan[];
  getAllMealPlans: () => void;
  clientView?: boolean;
}
const MealPlanListTable: FC<IMealPlanListTable> = ({
  mealPlans,
  getAllMealPlans,
}) => {
  const [openConfirmDeleteActionModal, setOpenConfirmDeleteActionModal] =
    useState<boolean>(false);
  const [selectedMealPlan, setSelectedMealPlan] = useState<MealPlan>(
    emptyPlaceholderMealPlan,
  );

  const handleDeleteMealPlan = async (id: number) => {
    const { error } = await supabase
      .from("meal_plan")
      .delete()
      .match({ id: id });
    if (error) {
      console.error("Failed to delete food:", error);
    }
    setSelectedMealPlan(emptyPlaceholderMealPlan);
    setOpenConfirmDeleteActionModal(false);
    getAllMealPlans();
  };

  return (
    <>
      <ConfirmDeleteActionModal
        open={openConfirmDeleteActionModal}
        setOpen={setOpenConfirmDeleteActionModal}
        deleteFunction={() => handleDeleteMealPlan(selectedMealPlan.id)}
      />
      <div className="mt-4">
        <div className="ring-1 ring-gray-300 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Client
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Created at
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Template
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Meals
                </th>

                <th scope="col" className="relative py-2 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Select</span>
                </th>
                <th scope="col" className="relative pr-2">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {mealPlans?.map((plan: MealPlan, planIdx) => (
                <tr
                  key={planIdx}
                  className={clsx(
                    "font-light",
                    planIdx % 2 !== 0 ? "bg-gray-50" : "",
                  )}
                >
                  <td
                    className={clsx(
                      planIdx === 0 ? "" : "border-t border-transparent",
                      "relative py-2 pl-4 pr-3 text-sm sm:pl-6",
                    )}
                  >
                    <div className="font-medium text-gray-900">{plan.name}</div>
                  </td>
                  <td
                    className={clsx(
                      planIdx === 0 ? "" : "border-t border-gray-200",
                      "hidden px-3 py-2 text-sm text-gray-500 lg:table-cell",
                    )}
                  >
                    {plan.name}
                  </td>
                  <td
                    className={clsx(
                      planIdx === 0 ? "" : "border-t border-gray-200",
                      "hidden px-3 py-2 text-sm text-gray-500 lg:table-cell",
                    )}
                  >
                    {parseSupabaseDate(plan.created_at || "", "date")}
                  </td>
                  <td
                    className={clsx(
                      planIdx === 0 ? "" : "border-t border-gray-200",
                      "hidden px-3 py-2 text-sm text-gray-500 lg:table-cell",
                    )}
                  >
                    {/* {plan.template ? "Yes" : "No"} */} No
                  </td>
                  <td
                    className={clsx(
                      planIdx === 0 ? "" : "border-t border-gray-200",
                      " px-3 py-2 text-sm text-gray-500 lg:table-cell",
                    )}
                  ></td>

                  <td
                    className={clsx(
                      planIdx === 0 ? "" : "border-t border-gray-200",
                      "relative py-2 pl-3 pr-4 text-right text-sm font-medium",
                    )}
                  >
                    <Link href={`/dashboard/plans/${plan.id}`}>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                      >
                        <p className="hidden lg:block">Select</p>
                        <ArrowRightCircleIcon className="w-6 lg:w-4 lg:ml-1 text-gro-indigo" />
                      </button>
                    </Link>
                    {planIdx !== 0 ? (
                      <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" />
                    ) : null}
                  </td>
                  <td
                    className={clsx(
                      planIdx === 0 ? "" : "border-t border-gray-200",
                      "hidden text-sm text-gray-500 lg:table-cell pr-2",
                    )}
                  >
                    <button
                      onClick={(_e) => {
                        setSelectedMealPlan(plan);
                        setOpenConfirmDeleteActionModal(true);
                      }}
                      className="text-red-500"
                    >
                      <TrashIcon className="w-4 pt-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MealPlanListTable;