export interface MealPlan {
  id: number;
  name: string;
  client: string;
  template: boolean;
  meals: number;
}

const plans: MealPlan[] = [
  {
    id: 1,
    name: "Breakfast 1",
    client: "Leslie Alexander",
    template: false,
    meals: 3,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MealPlanListTable() {
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
            {plans.map((plan, planIdx) => (
              <tr key={plan.id}>
                <td
                  className={classNames(
                    planIdx === 0 ? "" : "border-t border-transparent",
                    "relative py-4 pl-4 pr-3 text-sm sm:pl-6",
                  )}
                >
                  <div className="font-medium text-gray-900">{plan.name}</div>
                </td>
                <td
                  className={classNames(
                    planIdx === 0 ? "" : "border-t border-gray-200",
                    "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell",
                  )}
                >
                  {plan.client}
                </td>
                <td
                  className={classNames(
                    planIdx === 0 ? "" : "border-t border-gray-200",
                    "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell",
                  )}
                >
                  {plan.template ? "Yes" : "No"}
                </td>
                <td
                  className={classNames(
                    planIdx === 0 ? "" : "border-t border-gray-200",
                    "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell",
                  )}
                >
                  {plan.meals}
                </td>

                <td
                  className={classNames(
                    planIdx === 0 ? "" : "border-t border-transparent",
                    "relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6",
                  )}
                >
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    Select<span className="sr-only">, {plan.name}</span>
                  </button>
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
