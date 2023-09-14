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
  id: 0,
  name: "",
  created_at: null,
  food_category: 0,
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
      food: 0,
      created_at: null,
      id: 0,
      name: "",
      weight: 0,
    },
  ],
};

export const emptyPlaceholderMealPlan: MealPlan = {
  id: 0,
  name: "",
  created_at: null,
  client: "",
  template: false,
  trainer: "",
};
