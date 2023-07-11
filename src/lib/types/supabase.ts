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
          created_at: string | null;
          id: number;
          name: string;
          template: boolean;
          user: number | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
          template: boolean;
          user?: number | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
          template?: boolean;
          user?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "meal_plan_user_fkey";
            columns: ["user"];
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      meal_plan_food_serving_user: {
        Row: {
          created_at: string | null;
          id: number;
          meal_food_serving: number;
          meal_plan_id: number | null;
          user: number;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          meal_food_serving: number;
          meal_plan_id?: number | null;
          user: number;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          meal_food_serving?: number;
          meal_plan_id?: number | null;
          user?: number;
        };
        Relationships: [
          {
            foreignKeyName: "meal_plan_food_serving_user_meal_food_serving_fkey";
            columns: ["meal_food_serving"];
            referencedRelation: "meal_food_serving";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "meal_plan_food_serving_user_meal_plan_id_fkey";
            columns: ["meal_plan_id"];
            referencedRelation: "meal_plan";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "meal_plan_food_serving_user_user_fkey";
            columns: ["user"];
            referencedRelation: "user";
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
          food_id: number;
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
          food_id?: number;
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
          food_id?: number;
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
            foreignKeyName: "nutrients_food_id_fkey";
            columns: ["food_id"];
            referencedRelation: "food";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [];
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
      trainer: {
        Row: {
          created_at: string | null;
          email: string;
          first_name: string;
          id: number;
          last_name: string | null;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          first_name: string;
          id?: number;
          last_name?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          first_name?: string;
          id?: number;
          last_name?: string | null;
        };
        Relationships: [];
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
        Relationships: [
          {
            foreignKeyName: "user_organisation_fkey";
            columns: ["organisation"];
            referencedRelation: "organisation";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_trainer_fkey";
            columns: ["trainer"];
            referencedRelation: "trainer";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_user_type_fkey";
            columns: ["user_type"];
            referencedRelation: "user_type";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [
          {
            foreignKeyName: "user_permissions_user_type_fkey";
            columns: ["user_type"];
            referencedRelation: "user_type";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [];
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
