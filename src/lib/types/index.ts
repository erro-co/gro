export type FoodItem = Database["public"]["Tables"]["food"]["Row"];

export type Meal = Database["public"]["Tables"]["meal"]["Row"];

export type MealPlan = Database["public"]["Tables"]["meal_plan"]["Row"];

export type FoodCategory = Database["public"]["Tables"]["food_category"]["Row"];

export type Serving = Database["public"]["Tables"]["serving"]["Row"];

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
          created_at: string | null;
          food_category: number;
          id: number;
          name: string;
          tags: string | null;
        };
        Insert: {
          brand?: string | null;
          created_at?: string | null;
          food_category: number;
          id?: number;
          name: string;
          tags?: string | null;
        };
        Update: {
          brand?: string | null;
          created_at?: string | null;
          food_category?: number;
          id?: number;
          name?: string;
          tags?: string | null;
        };
      };
      food_category: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
        };
      };
      meal: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
        };
      };
      meal_food_serving: {
        Row: {
          created_at: string | null;
          food: number;
          id: number;
          meal: number;
          quantity: number;
          serving: number;
          template: boolean;
        };
        Insert: {
          created_at?: string | null;
          food: number;
          id?: number;
          meal: number;
          quantity: number;
          serving: number;
          template: boolean;
        };
        Update: {
          created_at?: string | null;
          food?: number;
          id?: number;
          meal?: number;
          quantity?: number;
          serving?: number;
          template?: boolean;
        };
      };
      meal_plan: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
          template: boolean;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
          template: boolean;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
          template?: boolean;
        };
      };
      meal_plan_food_serving_user: {
        Row: {
          created_at: string | null;
          id: number;
          meal_food_serving: number;
          user: number;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          meal_food_serving: number;
          user: number;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          meal_food_serving?: number;
          user?: number;
        };
      };
      nutrition: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
          nutrition_group: number | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
          nutrition_group?: number | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
          nutrition_group?: number | null;
        };
      };
      nutrition_food: {
        Row: {
          amount: number;
          created_at: string | null;
          food: number;
          id: number;
          nutrition: number;
        };
        Insert: {
          amount: number;
          created_at?: string | null;
          food: number;
          id?: number;
          nutrition: number;
        };
        Update: {
          amount?: number;
          created_at?: string | null;
          food?: number;
          id?: number;
          nutrition?: number;
        };
      };
      nutrition_group: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
        };
      };
      nutrition_meal: {
        Row: {
          created_at: string | null;
          id: number;
          meal: number;
          nutrition: number;
          total: number;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          meal: number;
          nutrition: number;
          total: number;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          meal?: number;
          nutrition?: number;
          total?: number;
        };
      };
      nutrition_meal_food_serving: {
        Row: {
          amount: number;
          created_at: string | null;
          id: number;
          meal: number;
          meal_food_serving: number;
          nutrition: number;
        };
        Insert: {
          amount: number;
          created_at?: string | null;
          id?: number;
          meal: number;
          meal_food_serving: number;
          nutrition: number;
        };
        Update: {
          amount?: number;
          created_at?: string | null;
          id?: number;
          meal?: number;
          meal_food_serving?: number;
          nutrition?: number;
        };
      };
      organisation: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
        };
      };
      serving: {
        Row: {
          created_at: string | null;
          food: number | null;
          id: number;
          name: string;
          weight: number;
        };
        Insert: {
          created_at?: string | null;
          food?: number | null;
          id?: number;
          name: string;
          weight: number;
        };
        Update: {
          created_at?: string | null;
          food?: number | null;
          id?: number;
          name?: string;
          weight?: number;
        };
      };
      user: {
        Row: {
          created_at: string | null;
          email: string;
          first_name: string;
          id: number;
          last_name: string;
          organisation: number;
          trainer: number | null;
          user_type: number;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          first_name: string;
          id?: number;
          last_name: string;
          organisation: number;
          trainer?: number | null;
          user_type: number;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          first_name?: string;
          id?: number;
          last_name?: string;
          organisation?: number;
          trainer?: number | null;
          user_type?: number;
        };
      };
      user_permissions: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
          user_type: number;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
          user_type: number;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
          user_type?: number;
        };
      };
      user_type: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
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
