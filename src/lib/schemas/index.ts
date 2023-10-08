import { z } from "zod";

export const servingSchema = z.object({
  name: z.string().nonempty({ message: "Serving measure name is required" }),
  weight: z
    .number()
    .min(1, { message: "Serving grams must be a positive number" }),
});

export const servingWithIdSchema = servingSchema.extend({
  id: z.string(),
});

export const categoriesSchema = z.object({
  id: z.string(),
  name: z.string().nonempty({ message: "Category name is required" }),
});

export const FoodSchema = z.object({
  name: z.string().nonempty(),
  brand: z.string().optional(),
  category: z.string(),
  calories: z.number().nonnegative(),
  saturated_fat: z.number().nonnegative(),
  trans_fat: z.number().nonnegative(),
  cholesterol: z.number().nonnegative(),
  sodium: z.number().nonnegative(),
  fibre: z.number().nonnegative(),
  sugar: z.number().nonnegative(),
  protein: z.number().nonnegative(),
  total_fat: z.number().nonnegative(),
  total_carbohydrate: z.number().nonnegative(),
});

export const FoodWithServingSchema = FoodSchema.extend({
  serving: z.array(servingSchema).min(1),
});

export const FoodWithServingAndId = FoodWithServingSchema.extend({
  id: z.string(),
});

export const newMealPlanFoodSchema = z.object({
  food: FoodSchema.extend({ id: z.string() }),
  serving: servingWithIdSchema,
  serving_quantity: z.number().min(1).nonnegative(),
});

export const newMealSchema = z.object({
  name: z.string().nonempty(),
  notes: z.string().optional(),
  foods: z.array(newMealPlanFoodSchema).min(1),
});

export const newMealPlanSchema = z.object({
  name: z.string().nonempty(),
  notes: z.string().optional(),
  meals: z.array(newMealSchema).min(1),
});
