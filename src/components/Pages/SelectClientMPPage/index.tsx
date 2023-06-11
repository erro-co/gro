"use client";
import SelectClientList from "@/components/SelectClientTable";
import { supabase } from "@/lib/supabase";
import { FC, useEffect, useState } from "react";
import LoadingIcon from "@/components/icons/LoadingIcon";
import SearchBarWithAddButton from "@/components/SearchBarWithAddButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

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

enum ClientStatus {
  Complete = "Active",
  InProgress = "In progress",
  Archived = "Archived",
}

const AddClientButton: FC = () => {
  return (
    <Link href="/dashboard/client/add">
      <div className="bg-gro-pink text-white p-2 rounded-lg flex whitespace-nowrap ml-2">
        <p className="my-auto hidden lg:block">New Client</p>
        <PlusCircleIcon className="w-7 m-0 lg:ml-1 my-auto" />
      </div>
    </Link>
  );
};

const SelectClientMPPage: FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllClients = async () => {
    const { data: clients, error } = await supabase
      .from("user")
      .select("*, trainer(*)")
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
      return null;
    } else {
      console.log("clients", clients);
      setClients(clients as Client[]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllClients();
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
      <div className="w-full">
        <h2 className="text-3xl font-bold text-center mt-12 lg:mt-24">
          Assign to a Client:
        </h2>
        <div className="mt-12 w-full lg:w-2/3 mx-auto">
          <SearchBarWithAddButton
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search for a client..."
            button={<AddClientButton />}
          />
        </div>
        <SelectClientList clients={clients} />
        <button className="flex mx-auto w-full lg:w-2/3 p-2 bg-gray-400 font-bold text-white rounded-lg mt-4">
          <p className="mx-auto">Skip</p>
        </button>
      </div>
    </>
  );
};

export default SelectClientMPPage;
