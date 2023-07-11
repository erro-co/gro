import { supabase } from "@/lib/supabase";
import { FC, useState } from "react";

export interface IAddClients {
  clientId: number;
}

const AddClients: FC<IAddClients> = ({ clientId }) => {
  const [clients, setClients] = useState([]);
  const fetchSingleClient = async () => {
    const { data: client, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", clientId)
      .single();
  };
  return <div>AddClients</div>;
};

export default AddClients;
