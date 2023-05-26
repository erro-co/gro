"use client";
import AddNewFoodForm from "@/components/forms/AddNewFood";
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
      servings: [{ name: "", weight: undefined }],
    },
  });
  return (
    <FormProvider {...methods}>
      <AddNewFoodForm />
    </FormProvider>
  );
};

export default AddNewFoodPage;
