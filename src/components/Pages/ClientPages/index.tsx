"use client";
import ClientsList from "./TrainerViewClientsPages/ClientsList";
import SearchBarWithAddButton from "@/components/SearchBarWithAddButton";
import { supabase } from "@/lib/supabase";
import { FC, useEffect, useState } from "react";
import Loading from "@/components/Loading";
import AddButton from "@/components/SearchBarWithAddButton/AddButton";
import { User } from "@/lib/types";
import { SelectTrainer } from "../MealPlanPages/TrainerViewMealPlanPages/SelectTrainer";
import { findTrainerIndex } from "@/lib/helpers";
import { redirect } from "next/navigation";

export enum ClientStatus {
  Complete = "Active",
  InProgress = "In progress",
  Archived = "Archived",
}
const statuses: Record<ClientStatus, string> = {
  [ClientStatus.Complete]: "text-green-700 bg-green-50 ring-green-600/20",
  [ClientStatus.InProgress]: "text-gray-600 bg-gray-50 ring-gray-500/10",
  [ClientStatus.Archived]: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
};

const ClientPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [clients, setClients] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrainer, setSelectedTrainer] = useState<User | "All">("All");
  const [trainers, setTrainers] = useState<User[] | null>(null);

  const getAllClients = async () => {
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

    const { data: clients, error } = await supabase
      .from("user")
      .select("*, trainer(*)")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      return null;
    } else {
      setClients(clients as User[]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllClients();
  }, []);

  if (
    typeof window !== "undefined" ||
    localStorage.getItem("role") !== "trainer" ||
    localStorage.getItem("role") !== "admin"
  ) {
    redirect("/dashboard/plans");
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-12">My Clients</h1>
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
          button={<AddButton link="/dashboard/clients/add" text="New Client" />}
        />
      </div>
      <ClientsList clients={clients} />
    </div>
  );
};

export default ClientPage;
