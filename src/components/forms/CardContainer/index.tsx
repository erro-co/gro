import clsx from "clsx";
import { FC } from "react";

export interface IFormCardContainer {
  children?: React.ReactNode;
  currentStep: number;
  previousStep: () => void;
  nextStep: () => void;
  totalSteps?: number;
}
const FormCardContainer: FC<IFormCardContainer> = ({
  children,
  currentStep,
  nextStep,
  previousStep,
  totalSteps,
}) => {
  return (
    <div className="w-full">
      <div
        className={clsx(currentStep > 0 ? "justify-between" : "", "flex my-2")}
      >
        {currentStep > 0 && (
          <button
            onClick={previousStep}
            type="button"
            className="p-2 text-white bg-blue-500 rounded-lg"
          >
            back
          </button>
        )}
        <button
          onClick={nextStep}
          type="button"
          className={clsx(
            currentStep > 0 ? "" : "ml-auto",
            "p-2 text-white bg-blue-500 rounded-lg",
          )}
        >
          Next
        </button>
        {children}
      </div>
    </div>
  );
};

export default FormCardContainer;
