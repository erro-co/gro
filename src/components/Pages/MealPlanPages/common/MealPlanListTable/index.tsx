import ConfirmDeleteActionModal from "@/components/Modals/ConfirmDeleteActionModal";
import { emptyPlaceholderMealPlan } from "@/lib/consts";
import { parseSupabaseDate } from "@/lib/helpers";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import clsx from "clsx";
import Link from "next/link";
import { FC, useState } from "react";
import AssignPlanModal from "../../TrainerViewMealPlanPages/AssignPlanModal";
import MealPlanItemMenu from "../../TrainerViewMealPlanPages/MealPlanItemMenu";

export interface IMealPlanListTable {
  mealPlans: MealPlan[];
  getAllMealPlans: () => void;
  clientView: boolean;
}

const MealPlanListTable: FC<IMealPlanListTable> = ({
  mealPlans,
  getAllMealPlans,
  clientView,
}) => {
  const [openConfirmDeleteActionModal, setOpenConfirmDeleteActionModal] =
    useState<boolean>(false);
  const [selectedMealPlan, setSelectedMealPlan] = useState<MealPlan>(
    emptyPlaceholderMealPlan,
  );

  const [openAssignClientModal, setOpenAssignClientModal] =
    useState<boolean>(false);
  const supabase = createClientComponentClient<Database>();

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
      <AssignPlanModal
        open={openAssignClientModal}
        setOpen={setOpenAssignClientModal}
        planId={selectedMealPlan.id}
      />
      <div className="mt-4 pb-8">
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
                  className={clsx(
                    clientView
                      ? "hidden"
                      : "hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 lg:table-cell",
                  )}
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
                  className={clsx(
                    clientView
                      ? "hidden"
                      : "hidden px-3 py-2 text-left text-sm font-semibold text-gray-900 lg:table-cell",
                  )}
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
                <th
                  scope="col"
                  className={clsx(clientView ? "hidden" : "relative")}
                >
                  <span className="sr-only">menu</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {mealPlans?.map((plan: MealPlan, planIdx) => (
                <tr
                  key={planIdx}
                  className={clsx(
                    "font-light divide-gray-50",
                    planIdx % 2 !== 0 ? "bg-gray-50" : "",
                    planIdx === mealPlans.length - 1 ? "rounded-b-lg" : "",
                  )}
                >
                  <td
                    className={clsx(
                      "relative py-2 pl-4 pr-3 text-sm sm:pl-6",
                      planIdx === mealPlans.length - 1 ? "rounded-bl-lg" : "",
                    )}
                  >
                    <div className="font-light text-gray-900">{plan.name}</div>
                  </td>

                  {clientView ? null : (
                    <td
                      className={clsx(
                        "hidden px-3 py-2 text-sm text-gray-500 lg:table-cell",
                      )}
                    >
                      {plan.client}
                    </td>
                  )}
                  <td
                    className={clsx(
                      "hidden px-3 py-2 text-sm text-gray-500 lg:table-cell",
                    )}
                  >
                    {parseSupabaseDate(plan.created_at || "", "date")}
                  </td>
                  {clientView ? null : (
                    <td
                      className={clsx(
                        "hidden px-3 py-2 text-sm text-gray-500 lg:table-cell",
                      )}
                    >
                      {plan.template ? "Yes" : "No"}
                    </td>
                  )}
                  <td
                    className={clsx(
                      " px-3 py-2 text-sm text-gray-500 lg:table-cell",
                    )}
                  ></td>

                  <td
                    className={clsx(
                      "relative py-2 pl-3 pr-4 text-right text-sm font-medium",
                      planIdx === mealPlans.length - 1 ? "rounded-br-lg" : "",
                    )}
                  >
                    <Link href={`/app/plans/${plan.id}`}>
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
                  {clientView ? null : (
                    <td
                      className={clsx(
                        "text-sm text-gray-500 ",
                        planIdx === mealPlans.length - 1 ? "rounded-br-lg" : "",
                      )}
                    >
                      {/* <button
                        onClick={(_e) => {
                          setSelectedMealPlan(plan);
                          setOpenConfirmDeleteActionModal(true);
                        }}
                        className="text-red-500"
                      >
                        <TrashIcon className="w-4 pt-1" />
                      </button> */}
                      <MealPlanItemMenu
                        plan={plan}
                        setSelectedMealPlan={setSelectedMealPlan}
                        setOpenConfirmDeleteActionModal={
                          setOpenConfirmDeleteActionModal
                        }
                        setOpenAssignClientModal={setOpenAssignClientModal}
                      />
                    </td>
                  )}
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
