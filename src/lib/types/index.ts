import { Database } from "./supabase";

export type Food = Database["public"]["Tables"]["food"]["Row"];
export type FoodUpdate = Database["public"]["Tables"]["food"]["Update"];
export type FoodInsert = Database["public"]["Tables"]["food"]["Insert"];

export type FoodCategory = Database["public"]["Tables"]["food_category"]["Row"];
export type FoodCategoryUpdate =
  Database["public"]["Tables"]["food_category"]["Update"];
export type FoodCategoryInsert =
  Database["public"]["Tables"]["food_category"]["Insert"];

export type Meal = Database["public"]["Tables"]["meal"]["Row"];
export type MealUpdate = Database["public"]["Tables"]["meal"]["Update"];
export type MealInsert = Database["public"]["Tables"]["meal"]["Insert"];

export type MealFoodServing =
  Database["public"]["Tables"]["meal_food_serving"]["Row"];
export type MealFoodServingUpdate =
  Database["public"]["Tables"]["meal_food_serving"]["Update"];
export type MealFoodServingInsert =
  Database["public"]["Tables"]["meal_food_serving"]["Insert"];

export type MealPlan = Database["public"]["Tables"]["meal_plan"]["Row"];
export type MealPlanUpdate =
  Database["public"]["Tables"]["meal_plan"]["Update"];
export type MealPlanInsert =
  Database["public"]["Tables"]["meal_plan"]["Insert"];

export type MealPlanFoodServingUser =
  Database["public"]["Tables"]["meal_plan_food_serving_user"]["Row"];
export type MealPlanFoodServingUserUpdate =
  Database["public"]["Tables"]["meal_plan_food_serving_user"]["Update"];
export type MealPlanFoodServingUserInsert =
  Database["public"]["Tables"]["meal_plan_food_serving_user"]["Insert"];

export type Nutrients = Database["public"]["Tables"]["nutrients"]["Row"];
export type NutrientsUpdate =
  Database["public"]["Tables"]["nutrients"]["Update"];
export type NutrientsInsert =
  Database["public"]["Tables"]["nutrients"]["Insert"];

export type Serving = Database["public"]["Tables"]["serving"]["Row"];
export type ServingUpdate = Database["public"]["Tables"]["serving"]["Update"];
export type ServingInsert = Database["public"]["Tables"]["serving"]["Insert"];

export type User = Database["public"]["Tables"]["profiles"]["Row"];
export type UserUpdate = Database["public"]["Tables"]["profiles"]["Update"];
export type UserInsert = Database["public"]["Tables"]["profiles"]["Insert"];
