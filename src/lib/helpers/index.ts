import { SupabaseClient } from "@supabase/supabase-js";

export const joinClassNames = (
  ...classes: (string | boolean | undefined)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

export const isValueEmpty = (value: any) =>
  value === undefined || value === null || value === "";

export const convertToBase100 = (
  food: FoodWithServing,
  weight: number,
): FoodWithServing => {
  console.log("food", food);
  console.log("weight", weight);
  const scale = Number(100 / weight);
  return {
    id: food.id,
    created_at: null,
    calories: Number((food.calories * scale).toFixed(1)),
    saturated_fat: Number((food.saturated_fat * scale).toFixed(1)),
    trans_fat: Number((food.trans_fat * scale).toFixed(1)),
    cholesterol: Number((food.cholesterol * scale).toFixed(1)),
    sodium: Number((food.sodium * scale).toFixed(1)),
    fibre: Number((food.fibre * scale).toFixed(1)),
    sugar: Number((food.sugar * scale).toFixed(1)),
    protein: Number((food.protein * scale).toFixed(1)),
    total_fat: Number((food.total_fat * scale).toFixed(1)),
    total_carbohydrate: Number((food.total_carbohydrate * scale).toFixed(1)),
    serving: food.serving,
    name: food.name,
    brand: food.brand,
    food_category: food.food_category,
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
  supabase: SupabaseClient,
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

export const isValidAustralianPhoneNumber = (phoneNumber: string): boolean => {
  const pattern = /^(?:\+61|0)[2-9]\d{8}$/;
  return pattern.test(phoneNumber);
};
