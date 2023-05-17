"use client";

import MealPlanListTable from "@/components/table/MealPlanListTable";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const PlansIndexPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-24">My plans</h1>
      <MealPlanListTable />
      <button className="bg-pink-500 text-white p-2 my-10 rounded-md">
        <Link href="/dashboard/plans/add">
          <PlusIcon className="w-10" />
        </Link>
      </button>
    </div>
  );
};

export default PlansIndexPage;
