import { z } from "zod";

export const servingSchema = z.object({
  measure: z.string().nonempty({ message: "Serving measure name is required" }),
  grams: z
    .number()
    .positive({ message: "Serving grams must be a positive number" }),
});

export const categoriesSchema = z.object({
  id: z.number().positive({ message: "Category ID is required" }),
  name: z.string().nonempty({ message: "Category name is required" }),
});

export const nutritionSchema = z.object({
  calories: z
    .number()
    .positive({ message: "Calories must be a positive number" }),
  saturatedFat: z
    .number()
    .positive({ message: "Saturated fat must be a positive number" }),
  transFat: z.number(),
  energy: z.number().positive({ message: "Energy must be a positive number" }),
  cholesterol: z
    .number()
    .positive({ message: "Cholesterol must be a positive number" }),
  sodium: z.number().positive({ message: "Sodium must be a positive number" }),
  fiber: z.number().positive({ message: "Fiber must be a positive number" }),
  sugar: z.number().positive({ message: "Sugar must be a positive number" }),
  protein: z
    .number()
    .positive({ message: "Protein must be a positive number" }),
  vitaminD: z
    .number()
    .positive({ message: "Vitamin D must be a positive number" }),
  calcium: z
    .number()
    .positive({ message: "Calcium must be a positive number" }),
  iron: z.number().positive({ message: "Iron must be a positive number" }),
  potassium: z
    .number()
    .positive({ message: "Potassium must be a positive number" }),
});

export const newFoodSchema = z.object({
  foodName: z.string().nonempty({ message: "Food name is required" }),
  foodBrand: z.string().optional(),
  foodCategory: categoriesSchema,
  servings: z.array(servingSchema),
  nutrition: nutritionSchema,
});
