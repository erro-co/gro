"use client";
import { FoodWithServingSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AddNewFoodForm from "../../../../components/Pages/NutritionPages/TrainerViewNutritionPages/AddNewFood";

export const dynamic = "force-dynamic";

const AddNewFoodPage: FC = () => {
  const methods = useForm({
    resolver: zodResolver(FoodWithServingSchema),
    defaultValues: {
      serving: [
        { name: "Serving", weight: 100 },
        { name: "g", weight: 1 },
      ],
      fibre: 0,
      sugar: 0,
      cholesterol: 0,
      saturated_fat: 0,
      trans_fat: 0,
      sodium: 0,
    },
  });
  return (
    <FormProvider {...methods}>
      <AddNewFoodForm />
    </FormProvider>
  );
};

export default AddNewFoodPage;
