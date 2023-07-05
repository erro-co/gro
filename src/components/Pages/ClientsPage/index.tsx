"use client";
import ClientsList from "@/components/ClientsList";
import SearchBarWithAddButton from "@/components/SearchBarWithAddButton";
import LoadingIcon from "@/components/icons/LoadingIcon";
import { supabase } from "@/lib/supabase";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

export interface Client {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  trainer: {
    first_name: string;
    last_name: string;
    email: string;
  };
  status: ClientStatus;
}

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

const AddClientButton: FC = () => {
  return (
    <Link href="/dashboard/clients/add">
      <div className="bg-gro-pink text-white p-2 rounded-lg flex whitespace-nowrap ml-2">
        <p className="my-auto hidden lg:block">New Client</p>
        <PlusCircleIcon className="w-7 m-0 lg:ml-1 my-auto" />
      </div>
    </Link>
  );
};

const ClientPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllClients = async () => {
    const { data: clients, error } = await supabase
      .from("user")
      .select("*, trainer(*)")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      return null;
    } else {
      setClients(clients as Client[]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllClients();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full mt-24">
        <div className="w-32 mx-auto">
          <LoadingIcon />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-12">My Clients</h1>
      <SearchBarWithAddButton
        placeholder="Search clients..."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        button={<AddClientButton />}
      />
      <ClientsList clients={clients} />
    </div>
  );
};

export default ClientPage;
