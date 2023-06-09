"use client";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import MealPlanListTable from "./MealPlanListTable";
import { supabase } from "@/lib/supabase";
import { MealPlan } from "@/lib/schemas";
import LoadingIcon from "../../icons/LoadingIcon";
import clsx from "clsx";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface MealPlanWithId extends MealPlan {
  id: number;
}

const PlansPage: FC = () => {
  const [mealPlans, setMealPlans] = useState<MealPlanWithId[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const getAllMealPlans = async () => {
    const { data: meal_plans, error } = await supabase
      .from("meal_plan")
      .select("*");

    if (error) {
      console.log("Error getting meal plans:", error);
      return;
    }
    setMealPlans(meal_plans as MealPlanWithId[]);
    setLoading(false);
  };

  useEffect(() => {
    getAllMealPlans();
  }, []);

  if (loading) {
    return (
      <div className="w-full mt-24">
        <div className="w-32 mx-auto">
          <LoadingIcon />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-12 text-center lg:text-left">
        My plans
      </h1>
      <div className="flex mb-4">
        <div className="border border-gray-300 flex bg-white rounded-lg flex-col w-full mx-auto">
          <div className="flex w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search my plans..."
              className={clsx(
                "rounded-l-lg",
                "pl-2 py-2 border-none focus:outline-none border-transparent focus:border-transparent focus:ring-0 grow bg-white",
              )}
            />
            <div className="my-auto pr-2">
              <MagnifyingGlassIcon className="text-gray-500 w-6" />
            </div>
          </div>
        </div>
        <Link href="/dashboard/plans/add">
          <div className="bg-gro-pink text-white p-2 rounded-md flex whitespace-nowrap ml-2">
            <p className="my-auto hidden lg:block">New plan</p>
            <PlusCircleIcon className="w-7 m-0 lg:ml-1 my-auto" />
          </div>
        </Link>
      </div>

      <MealPlanListTable mealPlans={mealPlans} />
    </div>
  );
};

export default PlansPage;
