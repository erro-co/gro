"use client";
import AddNewFoodForm from "@/components/Pages/NutritionPages/TrainerViewNutritionPages/AddNewFood";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FoodWithNutrientsAndServingSchema,
  FoodWithNutrientsAndServing,
} from "@/lib/schemas";

const AddNewFoodPage: FC = () => {
  const methods = useForm<FoodWithNutrientsAndServing>({
    resolver: zodResolver(FoodWithNutrientsAndServingSchema),
    defaultValues: {
      serving: [{ name: "Serving", weight: 100 }],
    },
  });
  return (
    <FormProvider {...methods}>
      <AddNewFoodForm />
    </FormProvider>
  );
};

export default AddNewFoodPage;
