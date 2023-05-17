"use client";
import { useState } from "react";
import FormCardContainer from "../../../../components/forms/CardContainer";
import SelectClientForm from "../../../../components/forms/SelectClient";
import AddMealForm from "@/components/forms/AddMeal";
import { useForm, FormProvider } from "react-hook-form";

const AddPlanPage = () => {
  const [formStep, setFormStep] = useState(0);
  const methods = useForm();

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  return (
    <FormProvider {...methods}>
      <div id="test" className="flex flex-col h-full">
        <FormCardContainer
          currentStep={formStep}
          previousStep={prevFormStep}
          nextStep={nextFormStep}
        ></FormCardContainer>
        {formStep === 0 && <AddMealForm />}
        {formStep === 1 && <SelectClientForm />}
        {formStep === 2 && <div>Step 3</div>}
        {formStep === 3 && <div>Step 4</div>}
      </div>
    </FormProvider>
  );
};

export default AddPlanPage;
