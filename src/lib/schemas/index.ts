import { z } from "zod";

export const servingSchema = z.object({
  name: z.string().nonempty({ message: "Serving measure name is required" }),
  weight: z
    .number()
    .min(1, { message: "Serving grams must be a positive number" }),
});

export const categoriesSchema = z.object({
  id: z.number().nonnegative(),
  name: z.string().nonempty({ message: "Category name is required" }),
});

export const nutrientsSchema = z.object({
  calories: z.number().nonnegative(),
  saturated_fat: z.number().nonnegative(),
  trans_fat: z.number().nonnegative(),
  cholesterol: z.number().nonnegative(),
  sodium: z.number().nonnegative(),
  fiber: z.number().nonnegative(),
  sugar: z.number().nonnegative(),
  protein: z.number().nonnegative(),
  vitamin_d: z.number().nonnegative(),
  calcium: z.number().nonnegative(),
  iron: z.number().nonnegative(),
  potassium: z.number().nonnegative(),
});

export const newFoodSchema = z.object({
  name: z.string().nonempty(),
  brand: z.string().optional(),
  food_category: categoriesSchema,
  servings: z.array(servingSchema),
  nutrients: nutrientsSchema,
});

export const newMealPlanFoodSchema = z.object({
  name: z.string().nonempty(),
  brand: z.string().optional(),
  food_category: categoriesSchema,
  servings: servingSchema,
  nutrients: nutrientsSchema,
});

export const newMealSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  foods: z.array(newMealPlanFoodSchema),
});

export const newMealPlanSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  meals: z.array(newMealSchema),
});

export type Serving = z.infer<typeof servingSchema>;
export type Categories = z.infer<typeof categoriesSchema>;
export type Nutrition = z.infer<typeof nutrientsSchema>;
export type NewFood = z.infer<typeof newFoodSchema>;
