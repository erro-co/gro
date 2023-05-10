import { FC } from "react";

export interface IAddMealForm {
  nextStep: () => void;
}

const AddMealForm: FC<IAddMealForm> = ({ nextStep }) => {
  return <div>AddMealForm</div>;
};

export default AddMealForm;
