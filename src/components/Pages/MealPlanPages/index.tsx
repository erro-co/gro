"use client";
import { FC, useEffect, useState } from "react";
import MealPlanListTable from "./common/MealPlanListTable";
import { supabase } from "@/lib/supabase";
import { MealPlan, User } from "@/lib/types";
import LoadingIcon from "../../icons/LoadingIcon";
import SearchBarWithAddButton from "@/components/SearchBarWithAddButton";
import { SelectTrainer } from "./TrainerViewMealPlanPages/SelectTrainer";
import AddButton from "@/components/SearchBarWithAddButton/AddButton";
import { findTrainerIndex } from "@/lib/helpers";

const PlansPage: FC = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTrainer, setSelectedTrainer] = useState<User | "All">("All");
  const [trainers, setTrainers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    if (trainers === null) {
      const { data: trainers, error } = await supabase
        .from("user")
        .select("*")
        .eq("user_type", 1)
        .order("first_name", { ascending: true });

      if (error) {
        console.log("Error getting trainers:", error);
        return;
      }
      console.log("trainers", trainers);
      setTrainers(trainers as User[]);
      console.log("findTrainerIndex", findTrainerIndex(trainers));
      setSelectedTrainer(trainers[findTrainerIndex(trainers)]);
    }

    let query = supabase
      .from("meal_plan")
      .select("*")
      .range(0, 9)
      .ilike("name", `%${searchTerm}%`)
      .order("created_at", { ascending: false });

    if (selectedTrainer !== "All") {
      query = query.eq(
        "user",
        trainers?.[findTrainerIndex(trainers)]?.id ?? "",
      );
    }

    const { data: meal_plans, error } = await query;

    if (error) {
      console.log("Error getting meal plans:", error);
      return;
    }
    setMealPlans(meal_plans as MealPlan[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedTrainer, searchTerm, fetchData]);

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
        Plans
      </h1>
      <div className="w-full flex flex-col-reverse lg:flex-row mb-8">
        <SelectTrainer
          selectedTrainer={selectedTrainer}
          setSelectedTrainer={setSelectedTrainer}
          trainers={trainers}
        />
        <SearchBarWithAddButton
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search plans"
          button={<AddButton link="/dashboard/plans/add" text="New Plan" />}
        />
      </div>
      <MealPlanListTable
        mealPlans={mealPlans}
        getAllMealPlans={() => fetchData()}
        clientView={false}
      />
    </>
  );
};

export default PlansPage;
