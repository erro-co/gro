export type FoodItem = {
  brand: string | null;
  calories: number;
  carbs: number;
  category: number | null;
  created_at: string | null;
  fats: number;
  id: number;
  name: string;
  protein: number;
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

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      food: {
        Row: {
          brand: string | null;
          calories: number;
          carbs: number;
          category: number | null;
          created_at: string | null;
          fats: number;
          id: number;
          name: string;
          protein: number;
        };
        Insert: {
          brand?: string | null;
          calories: number;
          carbs: number;
          category?: number | null;
          created_at?: string | null;
          fats: number;
          id?: number;
          name: string;
          protein: number;
        };
        Update: {
          brand?: string | null;
          calories?: number;
          carbs?: number;
          category?: number | null;
          created_at?: string | null;
          fats?: number;
          id?: number;
          name?: string;
          protein?: number;
        };
      };
      meal: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name?: string;
        };
      };
      meal_food_item: {
        Row: {
          created_at: string | null;
          food_id: number;
          id: number;
          meal_id: number;
        };
        Insert: {
          created_at?: string | null;
          food_id: number;
          id?: number;
          meal_id: number;
        };
        Update: {
          created_at?: string | null;
          food_id?: number;
          id?: number;
          meal_id?: number;
        };
      };
      meal_plan: {
        Row: {
          client_id: number | null;
          created_at: string | null;
          description: string | null;
          id: number;
          name: string;
          trainer_id: number | null;
        };
        Insert: {
          client_id?: number | null;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name: string;
          trainer_id?: number | null;
        };
        Update: {
          client_id?: number | null;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name?: string;
          trainer_id?: number | null;
        };
      };
      meal_plan_meal: {
        Row: {
          created_at: string | null;
          id: number;
          meal_id: number;
          meal_plan_id: number;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          meal_id: number;
          meal_plan_id: number;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          meal_id?: number;
          meal_plan_id?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
