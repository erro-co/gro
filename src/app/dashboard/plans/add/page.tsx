"use client";
import { useForm, FormProvider } from "react-hook-form";
import AddNewMealPlan from "@/components/Pages/CreatePlanPage";
import { zodResolver } from "@hookform/resolvers/zod";
import { newMealPlanSchema } from "@/lib/schemas";
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
