import { supabase } from "../supabase";

export const fetchAllDataFromTable = async (table: string) => {
  const { data, error } = await supabase.from(table).select("*");
  if (error) {
    throw error;
  }
  return data;
};
