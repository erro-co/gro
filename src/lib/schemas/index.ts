import { z } from "zod";

export const mealSchema = z.object({
  food: z.object({
    id: z.string(),
    name: z.string(),
    calories: z.number(),
    protein: z.number(),
    carbs: z.number(),
    fat: z.number(),
  }),
  quantity: z.number(),
  quantityType: z.enum([
    "grams",
    "ml",
    "cups",
    "tablespoons",
    "teaspoons",
    "units",
  ]),
});
