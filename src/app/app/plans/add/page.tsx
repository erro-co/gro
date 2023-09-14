"use client";
import AddNewMealPlan from "@/components/Pages/MealPlanPages/TrainerViewMealPlanPages/CreatePlanPage";
import { newMealPlanSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export type FormSchemaType = z.infer<typeof newMealPlanSchema>;

const AddPlanPage = () => {
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(newMealPlanSchema),
    defaultValues: {
      name: "Meal Plan 1",
      meals: [{ name: "Meal 1", foods: [] }],
    },
  });

  return (
    <FormProvider {...methods}>
      <AddNewMealPlan />
    </FormProvider>
  );
};

export default AddPlanPage;
