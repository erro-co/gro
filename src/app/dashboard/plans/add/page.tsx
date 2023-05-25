"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import AddNewMealPlan from "@/components/AddNewMealPlan";
import { zodResolver } from "@hookform/resolvers/zod";
import { newMealPlanSchema } from "@/lib/schemas";
import { z } from "zod";

export type FormSchemaType = z.infer<typeof newMealPlanSchema>;

const AddPlanPage = () => {
  const [formStep, setFormStep] = useState(0);
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(newMealPlanSchema),
    defaultValues: {
      meals: [{ foods: [] }],
    },
  });

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  return (
    <FormProvider {...methods}>
      <AddNewMealPlan />
    </FormProvider>
  );
};

export default AddPlanPage;
