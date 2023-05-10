import { FC } from "react";

export interface ICompletedForm {
  nextStep: () => void;
}
const CompletedForm: FC<ICompletedForm> = () => {
  return <div>FormCompleted</div>;
};

export default CompletedForm;
