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

export const emptyPlaceholderFood: FoodWithServing = {
  id: "",
  name: "",
  category: "",
  brand: "",
  calories: 0,
  cholesterol: 0,
  fibre: 0,
  protein: 0,
  saturated_fat: 0,
  sodium: 0,
  sugar: 0,
  total_carbohydrate: 0,
  total_fat: 0,
  trans_fat: 0,
  serving: [
    {
      food: "",
      id: "",
      name: "",
      weight: 0,
    },
  ],
};

export const emptyPlaceholderMealPlan: MealPlan = {
  id: "",
  name: "",
  created_at: "",
  client: "",
  trainer: "",
};
