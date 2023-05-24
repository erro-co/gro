"use client";

import MealPlanListTable from "@/components/table/MealPlanListTable";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const PlansIndexPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-12">My plans</h1>
      <Link href="/dashboard/plans/add">
        <div className="bg-pink-500 text-white ml-8 p-2 my-10 rounded-md w-fit flex">
          <PlusIcon className="w-10" />
          <p className="my-auto">Add Plan</p>
        </div>
      </Link>
      <MealPlanListTable />
    </div>
  );
};

export default PlansIndexPage;
