"use client";
import { useState } from "react";
import { MealPlanFormProvider } from "@/lib/context/AddMealContext";
import FormCardContainer from "../../../../components/forms/CardContainer";
import SelectClientForm from "../../../../components/forms/SelectClient";
import AddMealForm from "@/components/forms/AddMeal";

const AddPlanPage = () => {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  return (
    <MealPlanFormProvider>
      <FormCardContainer
        currentStep={formStep}
        previousStep={prevFormStep}
        nextStep={nextFormStep}
      >
        {formStep === 0 && <AddMealForm nextStep={nextFormStep} />}
        {formStep === 1 && <SelectClientForm nextStep={nextFormStep} />}
        {formStep === 2 && <div>Step 3</div>}
        {formStep === 3 && <div>Step 4</div>}
      </FormCardContainer>
    </MealPlanFormProvider>
  );
};

export default AddPlanPage;
