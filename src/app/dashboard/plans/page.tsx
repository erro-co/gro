"use client";

import MealPlanListTable from "@/components/table/MealPlanListTable";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const PlansIndexPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-12">My plans</h1>
      <div className="flex w-full">
        <Link href="/dashboard/plans/add" className="ml-auto mr-8">
          <div className="bg-gro-pink text-white p-2 rounded-md w-fit flex">
            <PlusCircleIcon className="w-6" />
            <p className="my-auto">New Plan</p>
          </div>
        </Link>
      </div>
      <MealPlanListTable />
    </div>
  );
};

export default PlansIndexPage;
