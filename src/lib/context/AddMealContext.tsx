import { FC, createContext, useContext, useState } from "react";

export const FormContext = createContext({});

export interface IFormProvider {
  children: React.ReactNode;
}
export const MealPlanFormProvider: FC<IFormProvider> = ({ children }) => {
  const [data, setData] = useState({});

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  return (
    <FormContext.Provider value={{ data, setFormValues }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = () => useContext(FormContext);
