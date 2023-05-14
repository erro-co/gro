import { FoodItem } from "../types";

export const joinClassNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const calculateCalories = (food: FoodItem, quantity: number) => {
  return {
    calories: Math.round(food.calories * quantity),
    carbs: Math.round(food.carbs * quantity),
    fats: Math.round(food.fats * quantity),
    protein: Math.round(food.protein * quantity),
  };
};
