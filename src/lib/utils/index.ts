import { Nutrition, Serving } from "../schemas";

export const joinClassNames = (
  ...classes: (string | boolean | undefined)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

export const isValueEmpty = (value: any) =>
  value === undefined || value === null || value === "";

export const convertToBase100 = (nutrition: Nutrition, serving: Serving) => {
  const scale = 100 / serving.grams;
  return {
    calories: nutrition.calories * scale,
    saturatedFat: nutrition.saturatedFat * scale,
    transFat: nutrition.transFat * scale,
    cholesterol: nutrition.cholesterol * scale,
    sodium: nutrition.sodium * scale,
    fiber: nutrition.fiber * scale,
    sugar: nutrition.sugar * scale,
    protein: nutrition.protein * scale,
    vitaminD: nutrition.vitaminD * scale,
    calcium: nutrition.calcium * scale,
    iron: nutrition.iron * scale,
    potassium: nutrition.potassium * scale,
  };
};
