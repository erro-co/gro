"use client";
import SearchBarWithAddButton from "@/components/SearchBarWithAddButton";
import { FC, useEffect, useState } from "react";
import LoadingIcon from "../../../icons/LoadingIcon";
import MealPlanListTable from "../common/MealPlanListTable";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const ClientViewMealPlanPage: FC = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = createClientComponentClient<Database>();

  const fetchData = async () => {
    const user = supabase.auth.getUser();
    console.log(user);

    const { data: meal_plans, error } = await supabase
      .from("meal_plan")
      .select("*")
      .range(0, 9)
      .ilike("name", `%${searchTerm}%`)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error getting meal plans:", error);
      return;
    }
    setMealPlans(meal_plans as MealPlan[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, fetchData]);

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
        My Plans
      </h1>
      <SearchBarWithAddButton
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search plans"
      />
      <MealPlanListTable
        mealPlans={mealPlans}
        getAllMealPlans={() => fetchData()}
        clientView={true}
      />
    </>
  );
};

export default ClientViewMealPlanPage;
