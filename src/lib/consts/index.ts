import { FoodWithNutrientsAndServing } from "../schemas";

export const foodCategories: string[] = [
  "fruits",
  "vegetables",
  "grains",
  "proteins",
  "dairy",
  "fats and oils",
  "sugars",
  "beverages",
];

export const emptyPlaceholderFood: FoodWithNutrientsAndServing = {
  name: "",
  food_category: 0,
  nutrients: {
    calories: 0,
    saturated_fat: 0,
    trans_fat: 0,
    cholesterol: 0,
    sodium: 0,
    fiber: 0,
    sugar: 0,
    protein: 0,
    calcium: 0,
    iron: 0,
    potassium: 0,
    total_carbs: 0,
    total_fat: 0,
    vitamin_d: 0,
  },
  serving: [
    {
      name: "",
      weight: 0,
    },
  ],
  brand: "",
};
