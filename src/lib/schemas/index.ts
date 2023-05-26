import { z } from "zod";

export const servingSchema = z.object({
  name: z.string().nonempty({ message: "Serving measure name is required" }),
  weight: z
    .number()
    .min(1, { message: "Serving grams must be a positive number" }),
});

export const servingWithIdSchema = servingSchema.extend({
  id: z.number().nonnegative(),
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
  total_fat: z.number().nonnegative(),
  total_carbs: z.number().nonnegative(),
});

export const FoodSchema = z.object({
  name: z.string().nonempty(),
  brand: z.string().optional(),
  food_category: z.number().nonnegative(),
});

export const FoodWithNutrientsAndServingSchema = FoodSchema.extend({
  nutrients: nutrientsSchema,
  servings: z.array(servingSchema).min(1),
});

export const newMealPlanFoodSchema = z.object({
  food: FoodSchema.extend({ id: z.number().nonnegative() }),
  serving: servingWithIdSchema,
  serving_quantity: z.number().min(1).nonnegative(),
  nutrients: nutrientsSchema,
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

export type ServingWithId = z.infer<typeof servingWithIdSchema>;
export type Food = z.infer<typeof FoodSchema>;
export type MealPlanFoodItem = z.infer<typeof newMealPlanFoodSchema>;
export type Meal = z.infer<typeof newMealSchema>;
export type MealPlan = z.infer<typeof newMealPlanSchema>;
export type Serving = z.infer<typeof servingSchema>;
export type Categories = z.infer<typeof categoriesSchema>;
export type Nutrition = z.infer<typeof nutrientsSchema>;
export type FoodWithNutrientsAndServing = z.infer<
  typeof FoodWithNutrientsAndServingSchema
>;
