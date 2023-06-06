"use client";

import MealPlanListTable from "@/components/table/MealPlanListTable";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const PlansIndexPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-12 text-center">My plans</h1>
      <div className="flex w-full">
        <Link href="/dashboard/plans/add" className="ml-auto mb-4 lg:mr-8">
          <div className="bg-gro-pink text-white p-2 rounded-md w-fit flex">
            <p className="my-auto">New plan</p>
            <PlusCircleIcon className="w-5 ml-1" />
          </div>
        </Link>
      </div>
      <MealPlanListTable />
    </div>
  );
};

export default PlansIndexPage;
