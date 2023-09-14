"use client";
import Loading from "@/components/Loading";
import SearchBarWithAddButton from "@/components/SearchBarWithAddButton";
import Addbutton from "@/components/SearchBarWithAddButton/AddButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import AssignClientModal from "./AssignClientModal";
import SelectClientList from "./SelectClientTable";

export interface IAssignUserToPlan {
  planId: string | null;
}

const AssignUserToPlan: FC<IAssignUserToPlan> = ({ planId }) => {
  const [clients, setClients] = useState<User[]>([]);
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const supabase = createClientComponentClient<Database>();

  const getAllClients = async () => {
    const { data: clients, error } = await supabase
      .from("profiles")
      .select("*")
      .ilike("first_name", `%${searchTerm}%`)
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
      return null;
    } else {
      setClients(clients as User[]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllClients();
  }, [searchTerm]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="w-full">
      <AssignClientModal
        isOpen={showModal}
        setIsOpen={setShowModal}
        selectedClient={selectedClient}
        planId={planId}
      />
      <h2 className="text-3xl font-bold text-center mt-12 lg:mt-24">
        Assign to a Client:
      </h2>
      <div className="mt-12 w-full lg:w-2/3 mx-auto">
        <SearchBarWithAddButton
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search for a client..."
          button={<Addbutton text="Add Client" link="/app/client/add" />}
        />
      </div>
      <SelectClientList
        clients={clients}
        setSelectedClient={setSelectedClient}
        setShowModal={setShowModal}
        planId={planId}
        supabase={supabase}
      />
      <Link
        href={"/app/plans"}
        className="flex mx-auto w-full lg:w-2/3 p-2 bg-gray-400 font-bold text-white rounded-lg mt-4"
      >
        <p className="mx-auto">Skip</p>
      </Link>
    </div>
  );
};

export default AssignUserToPlan;
