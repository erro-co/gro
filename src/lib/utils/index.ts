import { Nutrition } from "../schemas";

export const joinClassNames = (
  ...classes: (string | boolean | undefined)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

export const isValueEmpty = (value: any) =>
  value === undefined || value === null || value === "";

export const convertToBase100 = (nutrition: Nutrition, weight: number) => {
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
