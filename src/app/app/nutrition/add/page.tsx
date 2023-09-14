"use client";
import AddNewFoodForm from "@/components/Pages/NutritionPages/TrainerViewNutritionPages/AddNewFood";
import { FoodWithServingSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

const AddNewFoodPage: FC = () => {
  const methods = useForm({
    resolver: zodResolver(FoodWithServingSchema),
    defaultValues: {
      serving: [
        { name: "Serving", weight: 100 },
        { name: "g", weight: 1 },
      ],
    },
  });
  return (
    <FormProvider {...methods}>
      <AddNewFoodForm />
    </FormProvider>
  );
};

export default AddNewFoodPage;
