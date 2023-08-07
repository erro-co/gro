"use client";
import Loading from "@/components/Loading";
import SearchBarWithAddButton from "@/components/SearchBarWithAddButton";
import AddButton from "@/components/SearchBarWithAddButton/AddButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { SelectTrainer } from "../MealPlanPages/TrainerViewMealPlanPages/SelectTrainer";
import ClientsList from "./TrainerViewClientsPages/ClientsList";

export enum ClientStatus {
  Complete = "Active",
  InProgress = "Not verified",
  Archived = "Paused",
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
  const supabase = createClientComponentClient<Database>();

  const handleUserTypes = (users: User[]) => {
    const clients = users.filter((user) => user.type === "client");
    const trainers = users.filter(
      (user) => user.type === "trainer" || user.type === "admin",
    );
    setClients(clients);
    setTrainers(trainers);
  };

  const getAllUsers = async () => {
    const { data: users, error: getAllUsers } = await supabase
      .from("profiles")
      .select("*");
    if (getAllUsers) {
      console.log(getAllUsers);
    }
    if (users) {
      handleUserTypes(users);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("role") === "client"
    ) {
      redirect("/dashboard/plans");
    }
    getAllUsers();
  }, []);

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
