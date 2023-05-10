import { FC } from "react";

export interface ISelectClientForm {
  nextStep: () => void;
}

const SelectClientForm: FC<ISelectClientForm> = ({ nextStep }) => {
  return (
    <div className="">
      <h2 className="text-base font-bold">Select a Client:</h2>
      <button onClick={nextStep} type="button">
        Next
      </button>
    </div>
  );
};

export default SelectClientForm;
