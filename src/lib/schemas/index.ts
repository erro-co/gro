import { z } from "zod";

export const servingSchema = z.object({
  measure: z.string().nonempty({ message: "Serving measure name is required" }),
  grams: z
    .number()
    .min(1, { message: "Serving grams must be a positive number" }),
});

export const categoriesSchema = z.object({
  id: z.number().nonnegative(),
  name: z.string().nonempty({ message: "Category name is required" }),
});

export const nutritionSchema = z.object({
  calories: z.number().nonnegative(),
  saturatedFat: z.number().nonnegative(),
  transFat: z.number().nonnegative(),
  cholesterol: z.number().nonnegative(),
  sodium: z.number().nonnegative(),
  fiber: z.number().nonnegative(),
  sugar: z.number().nonnegative(),
  protein: z.number().nonnegative(),
  vitaminD: z.number().nonnegative(),
  calcium: z.number().nonnegative(),
  iron: z.number().nonnegative(),
  potassium: z.number().nonnegative(),
});

export const newFoodSchema = z.object({
  foodName: z.string().nonempty({ message: "Food name is required" }),
  foodBrand: z.string().optional(),
  foodCategory: categoriesSchema,
  servings: z.array(servingSchema),
  nutrition: nutritionSchema,
});

export type Serving = z.infer<typeof servingSchema>;
export type Categories = z.infer<typeof categoriesSchema>;
export type Nutrition = z.infer<typeof nutritionSchema>;
export type NewFood = z.infer<typeof newFoodSchema>;
