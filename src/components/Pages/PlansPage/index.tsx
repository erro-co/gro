"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import MealPlanListTable from "./MealPlanListTable";
import { supabase } from "@/lib/supabase";
import { MealPlan } from "@/lib/schemas";
import LoadingIcon from "../../icons/LoadingIcon";
import SearchBarWithAddButton from "@/components/SearchBarWithAddButton";

interface MealPlanWithId extends MealPlan {
  id: number;
}

const AddMealPlanButton: FC = () => (
  <Link href="/dashboard/plans/add">
    <div className="bg-gro-pink text-white p-2 rounded-md flex whitespace-nowrap ml-2">
      <p className="my-auto hidden lg:block">New plan</p>
      <PlusCircleIcon className="w-7 m-0 lg:ml-1 my-auto" />
    </div>
  </Link>
);

const PlansPage: FC = () => {
  const [mealPlans, setMealPlans] = useState<MealPlanWithId[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const getAllMealPlans = async () => {
    const { data: meal_plans, error } = await supabase
      .from("meal_plan")
      .select("*")
      .range(0, 6)
      .order("created_at", { ascending: false });

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
    <>
      <h1 className="text-3xl font-bold mb-12 text-center lg:text-left">
        My plans
      </h1>
      <SearchBarWithAddButton
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search plans"
        button={<AddMealPlanButton />}
      />
      <MealPlanListTable mealPlans={mealPlans} />
    </>
  );
};

export default PlansPage;
