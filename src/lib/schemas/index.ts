import { z } from "zod";

export const servingSchema = z.object({
  measure: z.string().nonempty({ message: "Serving measure name is required" }),
  grams: z
    .number()
    .min(1, { message: "Serving grams must be a positive number" }),
});

export const categoriesSchema = z.object({
  id: z.number().min(0, { message: "Category ID is required" }),
  name: z.string().nonempty({ message: "Category name is required" }),
});

export const nutritionSchema = z.object({
  calories: z
    .number()
    .min(0, { message: "Calories must be a positive number" }),
  saturatedFat: z
    .number()
    .min(0, { message: "Saturated fat must be a positive number" }),
  transFat: z.number().min(0),
  cholesterol: z
    .number()
    .min(0, { message: "Cholesterol must be a positive number" }),
  sodium: z.number().min(0, { message: "Sodium must be a positive number" }),
  fiber: z.number().min(0, { message: "Fiber must be a positive number" }),
  sugar: z.number().min(0, { message: "Sugar must be a positive number" }),
  protein: z.number().min(0, { message: "Protein must be a positive number" }),
  vitaminD: z
    .number()
    .min(0, { message: "Vitamin D must be a positive number" }),
  calcium: z.number().min(0, { message: "Calcium must be a positive number" }),
  iron: z.number().min(0, { message: "Iron must be a positive number" }),
  potassium: z
    .number()
    .min(0, { message: "Potassium must be a positive number" }),
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
