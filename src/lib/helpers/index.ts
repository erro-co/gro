import { SupabaseClient } from "@supabase/supabase-js";
import { Nutrition } from "../schemas";
import { supabase } from "../supabase";
import { User } from "../types";

export const joinClassNames = (
  ...classes: (string | boolean | undefined)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

export const isValueEmpty = (value: any) =>
  value === undefined || value === null || value === "";

export const convertToBase100 = (
  nutrition: Nutrition,
  weight: number,
): Nutrition => {
  const scale = Number(100 / weight);
  return {
    calories: Number((nutrition.calories * scale).toFixed(1)),
    saturated_fat: Number((nutrition.saturated_fat * scale).toFixed(1)),
    trans_fat: Number((nutrition.trans_fat * scale).toFixed(1)),
    cholesterol: Number((nutrition.cholesterol * scale).toFixed(1)),
    sodium: Number((nutrition.sodium * scale).toFixed(1)),
    fiber: Number((nutrition.fiber * scale).toFixed(1)),
    sugar: Number((nutrition.sugar * scale).toFixed(1)),
    protein: Number((nutrition.protein * scale).toFixed(1)),
    vitamin_d: Number((nutrition.vitamin_d * scale).toFixed(1)),
    calcium: Number((nutrition.calcium * scale).toFixed(1)),
    iron: Number((nutrition.iron * scale).toFixed(1)),
    potassium: Number((nutrition.potassium * scale).toFixed(1)),
    total_fat: Number((nutrition.total_fat * scale).toFixed(1)),
    total_carbs: Number((nutrition.total_carbs * scale).toFixed(1)),
  };
};

export const capitalizeFirstLetter = (input: string): string => {
  if (!input) return input;
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
};

export const convertKjToKcal = (kj: number): number => {
  // Conversion factor: 1 kilocalorie (kcal) = 4.184 kilojoules (kJ)
  const conversionFactor = 4.184;

  // Convert kilojoules to kilocalories
  const kcal = kj / conversionFactor;

  // Round the result to 2 decimal places
  const roundedKcal = Math.round(kcal * 100) / 100;

  return roundedKcal;
};

export const parseSupabaseDate = (
  input: string,
  type: "date" | "dateTime",
): string => {
  // Create a date object from the input string
  const date = new Date(input);

  // Extract and format the desired components
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JS, so we add 1
  const year = date.getFullYear();

  // Return the formatted string

  if (type === "date") return `${day}/${month}/${year}`;
  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

export const supabaseValueExists = async (
  table: string,
  column: string,
  value: any,
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select(column)
      .eq(column, value)
      .limit(1);

    if (error) {
      console.error(
        `An error occurred while checking the value of ${value} in ${table}.${column}`,
        error,
      );
      return false;
    }

    if (data && data.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("An error occurred while checking the value.", error);
    return false;
  }
};

export const getUserRole = async (email: string, supabase: SupabaseClient) => {
  const { data, error } = await supabase
    .from("user")
    .select("user_type(name)")
    .eq("email", email)
    .single();
  if (error || !data) {
    throw error || new Error("No user data returned");
  }
  return data;
};

export const findTrainerIndex = (trainers: User[]) => {
  if (!trainers || typeof window === "undefined") return 0;
  const user = localStorage.getItem("user");

  if (user) {
    const { email } = JSON.parse(user);
    const trainerIndex = trainers.findIndex(
      (trainer) => trainer.email === email,
    );
    console.log("trainer", trainerIndex);
    return trainerIndex;
  }
  return 0;
};
