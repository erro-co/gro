"use client";
import SearchBarWithAddButton from "@/components/SearchBarWithAddButton";
import { FC, useEffect, useState } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Loading from "../../../Loading";
import { MealPlanUserFull } from "../TrainerViewMealPlanPages";
import MealPlanListTable from "./MealPlanListTable";

const ClientViewMealPlanPage: FC = () => {
  const [mealPlans, setMealPlans] = useState<MealPlanUserFull[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = createClientComponentClient<Database>();

  const fetchData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: meal_plans, error } = await supabase
      .from("meal_plan")
      .select(`*, client(*)`)
      .range(0, 9)
      .ilike("name", `%${searchTerm}%`)
      .eq("client", user?.id || "")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error getting meal plans:", error);
      return;
    }
    console.log("meal_plans", meal_plans);
    setMealPlans(meal_plans as unknown as MealPlanUserFull[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <h1 className="text-3xl font-bold mb-12 text-center lg:text-left">
        My Plans
      </h1>
      {mealPlans.length < 5 ? (
        <SearchBarWithAddButton
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search plans"
        />
      ) : null}

      <MealPlanListTable
        mealPlans={mealPlans}
        getAllMealPlans={() => fetchData()}
        clientView={true}
      />
    </>
  );
};

export default ClientViewMealPlanPage;
