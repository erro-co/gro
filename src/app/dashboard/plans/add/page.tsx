"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import AddNewMealPlan from "@/components/AddNewMealPlan";

const AddPlanPage = () => {
  const [formStep, setFormStep] = useState(0);
  const methods = useForm();

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  return (
    <FormProvider {...methods}>
      <AddNewMealPlan />
    </FormProvider>
  );
};

export default AddPlanPage;
