"use client";
import SearchBarWithAddButton from "@/components/SearchBarWithAddButton";
import AddButton from "@/components/SearchBarWithAddButton/AddButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FC, useEffect, useState } from "react";
import LoadingIcon from "../../../icons/LoadingIcon";
import MealPlanListTable from "../common/MealPlanListTable";
import { SelectTrainer } from "./SelectTrainer";

type MealPlanUser = MealPlan & { user: User };

const TrainerViewMealPlanPage: FC = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTrainer, setSelectedTrainer] = useState<User | "All">("All");
  const [trainers, setTrainers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = createClientComponentClient<Database>();

  const findTrainerId = (trainers: User[]) => {
    if (!trainers || typeof window === "undefined") return;
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (role === "admin") {
      setSelectedTrainer("All");
      return;
    }

    if (user) {
      const { email } = JSON.parse(user);
      const trainer = trainers.find((trainer) => trainer.email === email);
      setSelectedTrainer(trainer ?? "All");
      return trainer ? trainer.id : 0;
    }
    return;
  };

  const fetchData = async () => {
    if (trainers === null) {
      const { data: trainers, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("type", "client")
        .order("first_name", { ascending: true });

      if (error) {
        console.log("Error getting trainers:", error);
        return;
      }
      console.log("trainers", trainers);
      setTrainers(trainers as User[]);
      findTrainerId(trainers as User[]);
      console.log("findTrainerID", findTrainerId(trainers));
    }

    let query = supabase
      .from("meal_plan")
      .select(`*`)
      .range(0, 9)
      .ilike("name", `%${searchTerm}%`)
      .order("created_at", { ascending: false });

    if (selectedTrainer !== "All") {
      query = query.eq("trainer", selectedTrainer.id);
    }

    const { data: meal_plans, error } = await query;

    if (error) {
      console.log("Error getting meal plans:", error);
      return;
    }
    console.log("meal_plans", meal_plans);
    setMealPlans(meal_plans as MealPlanUser[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedTrainer, searchTerm]);

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
          button={<AddButton link="/app/plans/add" text="New Plan" />}
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

export default TrainerViewMealPlanPage;
