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
          created_at: string | null;
          food_category: number;
          id: number;
          name: string;
        };
        Insert: {
          brand?: string | null;
          created_at?: string | null;
          food_category: number;
          id?: number;
          name: string;
        };
        Update: {
          brand?: string | null;
          created_at?: string | null;
          food_category?: number;
          id?: number;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "food_food_category_fkey";
            columns: ["food_category"];
            referencedRelation: "food_category";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [];
      };
      meal: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
          notes: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
          notes?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
          notes?: string | null;
        };
        Relationships: [];
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
          template?: boolean;
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
          created_at: string | null;
          id: number;
          name: string;
          template: boolean;
          trainer: string | null;
        };
        Insert: {
          client?: string | null;
          created_at?: string | null;
          id?: number;
          name: string;
          template: boolean;
          trainer?: string | null;
        };
        Update: {
          client?: string | null;
          created_at?: string | null;
          id?: number;
          name?: string;
          template?: boolean;
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
          created_at: string | null;
          id: number;
          meal_food_serving: number;
          meal_plan: number | null;
        };
        Insert: {
          client?: string | null;
          created_at?: string | null;
          id?: number;
          meal_food_serving: number;
          meal_plan?: number | null;
        };
        Update: {
          client?: string | null;
          created_at?: string | null;
          id?: number;
          meal_food_serving?: number;
          meal_plan?: number | null;
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
      nutrients: {
        Row: {
          calcium: number;
          calories: number;
          cholesterol: number;
          created_at: string | null;
          fiber: number;
          food: number;
          iron: number;
          potassium: number;
          protein: number;
          saturated_fat: number;
          sodium: number;
          sugar: number;
          total_carbs: number;
          total_fat: number;
          trans_fat: number;
          vitamin_d: number;
        };
        Insert: {
          calcium: number;
          calories: number;
          cholesterol: number;
          created_at?: string | null;
          fiber: number;
          food?: number;
          iron: number;
          potassium: number;
          protein: number;
          saturated_fat: number;
          sodium: number;
          sugar: number;
          total_carbs: number;
          total_fat: number;
          trans_fat: number;
          vitamin_d: number;
        };
        Update: {
          calcium?: number;
          calories?: number;
          cholesterol?: number;
          created_at?: string | null;
          fiber?: number;
          food?: number;
          iron?: number;
          potassium?: number;
          protein?: number;
          saturated_fat?: number;
          sodium?: number;
          sugar?: number;
          total_carbs?: number;
          total_fat?: number;
          trans_fat?: number;
          vitamin_d?: number;
        };
        Relationships: [
          {
            foreignKeyName: "nutrients_food_fkey";
            columns: ["food"];
            referencedRelation: "food";
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
          last_name: string | null;
          phone: string | null;
          status: Database["public"]["Enums"]["status"];
          trainer: string | null;
          type: Database["public"]["Enums"]["profile_type"] | null;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          first_name: string;
          id: string;
          last_name?: string | null;
          phone?: string | null;
          status: Database["public"]["Enums"]["status"];
          trainer?: string | null;
          type?: Database["public"]["Enums"]["profile_type"] | null;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string | null;
          phone?: string | null;
          status?: Database["public"]["Enums"]["status"];
          trainer?: string | null;
          type?: Database["public"]["Enums"]["profile_type"] | null;
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
        Relationships: [
          {
            foreignKeyName: "serving_food_fkey";
            columns: ["food"];
            referencedRelation: "food";
            referencedColumns: ["id"];
          },
        ];
      };
      tp: {
        Row: {
          created_at: string | null;
          id: string;
          name: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          name?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tp_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
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
