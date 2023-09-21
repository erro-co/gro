export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      food: {
        Row: {
          brand: string | null;
          calories: number;
          category: string;
          cholesterol: number;
          fibre: number;
          id: string;
          name: string;
          protein: number;
          saturated_fat: number;
          sodium: number;
          sugar: number;
          total_carbohydrate: number;
          total_fat: number;
          trans_fat: number;
        };
        Insert: {
          brand?: string | null;
          calories: number;
          category: string;
          cholesterol: number;
          fibre: number;
          id?: string;
          name: string;
          protein: number;
          saturated_fat: number;
          sodium: number;
          sugar: number;
          total_carbohydrate: number;
          total_fat: number;
          trans_fat: number;
        };
        Update: {
          brand?: string | null;
          calories?: number;
          category?: string;
          cholesterol?: number;
          fibre?: number;
          id?: string;
          name?: string;
          protein?: number;
          saturated_fat?: number;
          sodium?: number;
          sugar?: number;
          total_carbohydrate?: number;
          total_fat?: number;
          trans_fat?: number;
        };
        Relationships: [
          {
            foreignKeyName: "food_category_fkey";
            columns: ["category"];
            referencedRelation: "food_category";
            referencedColumns: ["id"];
          },
        ];
      };
      food_category: {
        Row: {
          created_at: string;
          id: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      meal: {
        Row: {
          id: string;
          name: string;
          notes: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          notes?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          notes?: string | null;
        };
        Relationships: [];
      };
      meal_food_serving: {
        Row: {
          food: string;
          id: string;
          meal: string;
          quantity: number;
          serving: string;
        };
        Insert: {
          food: string;
          id?: string;
          meal: string;
          quantity: number;
          serving: string;
        };
        Update: {
          food?: string;
          id?: string;
          meal?: string;
          quantity?: number;
          serving?: string;
        };
        Relationships: [
          {
            foreignKeyName: "meal_food_serving_food_fkey";
            columns: ["food"];
            referencedRelation: "food";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "meal_food_serving_meal_fkey";
            columns: ["meal"];
            referencedRelation: "meal";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "meal_food_serving_serving_fkey";
            columns: ["serving"];
            referencedRelation: "serving";
            referencedColumns: ["id"];
          },
        ];
      };
      meal_plan: {
        Row: {
          client: string | null;
          created_at: string;
          id: string;
          name: string;
          trainer: string | null;
        };
        Insert: {
          client?: string | null;
          created_at?: string;
          id?: string;
          name: string;
          trainer?: string | null;
        };
        Update: {
          client?: string | null;
          created_at?: string;
          id?: string;
          name?: string;
          trainer?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "meal_plan_client_fkey";
            columns: ["client"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "meal_plan_trainer_fkey";
            columns: ["trainer"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      meal_plan_food_serving_user: {
        Row: {
          client: string | null;
          id: string;
          meal_food_serving: string;
          meal_plan: string;
        };
        Insert: {
          client?: string | null;
          id?: string;
          meal_food_serving: string;
          meal_plan: string;
        };
        Update: {
          client?: string | null;
          id?: string;
          meal_food_serving?: string;
          meal_plan?: string;
        };
        Relationships: [
          {
            foreignKeyName: "meal_plan_food_serving_user_client_fkey";
            columns: ["client"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "meal_plan_food_serving_user_meal_food_serving_fkey";
            columns: ["meal_food_serving"];
            referencedRelation: "meal_food_serving";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "meal_plan_food_serving_user_meal_plan_fkey";
            columns: ["meal_plan"];
            referencedRelation: "meal_plan";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string | null;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          phone: string | null;
          status: Database["public"]["Enums"]["status"] | null;
          trainer: string | null;
          type: Database["public"]["Enums"]["profile_type"];
        };
        Insert: {
          created_at?: string | null;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          phone?: string | null;
          status?: Database["public"]["Enums"]["status"] | null;
          trainer?: string | null;
          type?: Database["public"]["Enums"]["profile_type"];
        };
        Update: {
          created_at?: string | null;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          phone?: string | null;
          status?: Database["public"]["Enums"]["status"] | null;
          trainer?: string | null;
          type?: Database["public"]["Enums"]["profile_type"];
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profiles_trainer_fkey";
            columns: ["trainer"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      serving: {
        Row: {
          food: string;
          id: string;
          name: string;
          weight: number;
        };
        Insert: {
          food: string;
          id?: string;
          name: string;
          weight: number;
        };
        Update: {
          food?: string;
          id?: string;
          name?: string;
          weight?: number;
        };
        Relationships: [
          {
            foreignKeyName: "serving_food_fkey";
            columns: ["food"];
            referencedRelation: "food";
            referencedColumns: ["id"];
          },
        ];
      };
      template_meal: {
        Row: {
          id: string;
          name: string;
          notes: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          notes?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          notes?: string | null;
        };
        Relationships: [];
      };
      template_meal_food_serving: {
        Row: {
          created_at: string;
          food: string;
          id: string;
          meal: string;
          quantity: number;
          serving: string;
        };
        Insert: {
          created_at?: string;
          food: string;
          id?: string;
          meal: string;
          quantity: number;
          serving: string;
        };
        Update: {
          created_at?: string;
          food?: string;
          id?: string;
          meal?: string;
          quantity?: number;
          serving?: string;
        };
        Relationships: [
          {
            foreignKeyName: "template_meal_food_serving_food_fkey";
            columns: ["food"];
            referencedRelation: "food";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "template_meal_food_serving_meal_fkey";
            columns: ["meal"];
            referencedRelation: "template_meal";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "template_meal_food_serving_serving_fkey";
            columns: ["serving"];
            referencedRelation: "serving";
            referencedColumns: ["id"];
          },
        ];
      };
      template_meal_plan: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          trainer: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          trainer?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          trainer?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "template_meal_plan_trainer_fkey";
            columns: ["trainer"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      template_meal_plan_food_serving: {
        Row: {
          id: number;
          meal_food_serving: string | null;
          meal_plan: string | null;
        };
        Insert: {
          id?: number;
          meal_food_serving?: string | null;
          meal_plan?: string | null;
        };
        Update: {
          id?: number;
          meal_food_serving?: string | null;
          meal_plan?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "template_meal_plan_food_serving_meal_food_serving_fkey";
            columns: ["meal_food_serving"];
            referencedRelation: "template_meal_food_serving";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "template_meal_plan_food_serving_meal_plan_fkey";
            columns: ["meal_plan"];
            referencedRelation: "template_meal_plan";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      profile_type: "admin" | "client" | "trainer";
      status: "active" | "not verified" | "paused";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
