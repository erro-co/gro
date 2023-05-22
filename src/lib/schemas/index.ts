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

export const newFoodSchema = z.object({
  foodName: z.string().nonempty({ message: "Food name is required" }),
  foodBrand: z.string().optional(),
  foodCategory: categoriesSchema,
  servings: z.array(servingSchema),
});
