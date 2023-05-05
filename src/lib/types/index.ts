export type FoodItem = {
  id: number;
  name: string;
  brand?: string;
  category?: "string";
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
};

export type MealPlanFoodITem = {
  foodItem: FoodItem;
  quantity: number;
};

export type Meal = {
  id: number;
  name: string;
  description: string;
  foods: MealPlanFoodITem[];
};

export type MealPlan = {
  id: number;
  trainer_id: number;
  client_id: number;
  name: string;
  description: string;
  meals: Meal[];
};
