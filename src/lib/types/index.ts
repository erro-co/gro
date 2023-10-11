import type { Database as DB } from "./database.types";

declare global {
  type Database = DB;
  export type Food = DB["public"]["Tables"]["food"]["Row"];
  export type FoodUpdate = DB["public"]["Tables"]["food"]["Update"];
  export type FoodInsert = DB["public"]["Tables"]["food"]["Insert"];

  export type FoodCategory = DB["public"]["Tables"]["food_category"]["Row"];
  export type FoodCategoryUpdate =
    DB["public"]["Tables"]["food_category"]["Update"];
  export type FoodCategoryInsert =
    DB["public"]["Tables"]["food_category"]["Insert"];

  export type Meal = DB["public"]["Tables"]["meal"]["Row"];
  export type MealUpdate = DB["public"]["Tables"]["meal"]["Update"];
  export type MealInsert = DB["public"]["Tables"]["meal"]["Insert"];

  export type MealFoodServing =
    DB["public"]["Tables"]["meal_food_serving"]["Row"];
  export type MealFoodServingUpdate =
    DB["public"]["Tables"]["meal_food_serving"]["Update"];
  export type MealFoodServingInsert =
    DB["public"]["Tables"]["meal_food_serving"]["Insert"];

  export type MealPlan = DB["public"]["Tables"]["meal_plan"]["Row"];
  export type MealPlanUpdate = DB["public"]["Tables"]["meal_plan"]["Update"];
  export type MealPlanInsert = DB["public"]["Tables"]["meal_plan"]["Insert"];

  export type MealPlanFoodServingUser =
    DB["public"]["Tables"]["meal_plan_food_serving_user"]["Row"];
  export type MealPlanFoodServingUserUpdate =
    DB["public"]["Tables"]["meal_plan_food_serving_user"]["Update"];
  export type MealPlanFoodServingUserInsert =
    DB["public"]["Tables"]["meal_plan_food_serving_user"]["Insert"];

  export type Serving = DB["public"]["Tables"]["serving"]["Row"];
  export type ServingUpdate = DB["public"]["Tables"]["serving"]["Update"];
  export type ServingInsert = DB["public"]["Tables"]["serving"]["Insert"];

  export type User = DB["public"]["Tables"]["profiles"]["Row"];
  export type UserUpdate = DB["public"]["Tables"]["profiles"]["Update"];
  export type UserInsert = DB["public"]["Tables"]["profiles"]["Insert"];

  // Combined Types

  export type FoodWithServing = Food & { serving: Serving[] };
  export type FoodWithServingUpdate = FoodUpdate & { serving: ServingUpdate[] };
  export type FoodWithServingInsert = FoodInsert & { serving: ServingInsert[] };

  export type CompleteFood = FoodWithServing & { food_category: FoodCategory };

  export type MealWithFoods = Meal & { food: FoodWithServing[] }[];

  export type FoodWithServingWithQuantity = {
    quantity: number;
    serving: Serving;
    food: Food;
  };
  export type MealFormattedWithSummary = {
    id: string;
    name: string;
    notes: string | null;
    foods?: FoodWithServingWithQuantity[];
    totalCalories?: number;
    totalFat?: number;
    totalProtein?: number;
    totalCarbs?: number;
  };

  export type CompleteMealPlanJoined = {
    meal_plan_id: string;
    meal_plan_name: string;
    meals: MealFormattedWithSummary[];
    mealTotalCalories?: number;
    mealTotalFat?: number;
    mealTotalProtein?: number;
  };
}

export type SquareAppointmentResponse = {
  id: string;
  version: number;
  status: "CANCELLED_BY_SELLER" | "ACCEPTED"; // Add other statuses if available
  createdAt: string; // Consider using Date if you'll parse the string
  updatedAt: string; // Consider using Date if you'll parse the string
  startAt: string; // Consider using Date if you'll parse the string
  locationId: string;
  customerId: string;
  appointmentSegments: AppointmentSegment[];
  transitionTimeMinutes: number;
  allDay: boolean;
  locationType: "BUSINESS_LOCATION"; // Add other types if available
  creatorDetails: CreatorDetails;
  source: "FIRST_PARTY_MERCHANT"; // Add other sources if available
};

type AppointmentSegment = {
  durationMinutes: number;
  serviceVariationId: string;
  teamMemberId: string;
  serviceVariationVersion: string;
  intermissionMinutes: number;
  anyTeamMember: boolean;
};

type CreatorDetails = {
  creatorType: "TEAM_MEMBER"; // Add other types if available
  teamMemberId: string;
};

export type Appointment = {
  id: string;
  status: "CANCELLED_BY_SELLER" | "ACCEPTED";
  startAt: string;
  endAt: string;
  durationMinutes: number;
};
