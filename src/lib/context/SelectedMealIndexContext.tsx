import React, { createContext, useState, useContext } from "react";

// Define the context type
type MealIndexContextType = {
  value: number;
  updateValue: (newValue: number) => void;
};

// Create the context
export const SelectedMealIndexContext = createContext<MealIndexContextType>({
  value: 0,
  updateValue: () => {},
});

export interface NumberProviderProps {
  children: React.ReactNode;
}

// Create a provider for this context
export const MealIndexProvider: React.FC<NumberProviderProps> = ({
  children,
}) => {
  const [value, setValue] = useState(0);

  const updateValue = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <SelectedMealIndexContext.Provider value={{ value, updateValue }}>
      {children}
    </SelectedMealIndexContext.Provider>
  );
};

// Export a custom hook that simplifies the usage of the context
export const useMealIndexContext = (): MealIndexContextType =>
  useContext(SelectedMealIndexContext);
