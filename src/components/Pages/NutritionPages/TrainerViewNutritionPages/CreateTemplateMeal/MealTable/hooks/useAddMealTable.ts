import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { Dispatch, SetStateAction, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

interface UseAddMealTableProps {
  setShowFoodSearchModal: Dispatch<SetStateAction<boolean>>;
}

const useAddMealTable = ({ setShowFoodSearchModal }: UseAddMealTableProps) => {
  const [showNotesModal, setShowNotesModal] = useState(false);
  const { watch, control } = useFormContext();
  const { remove } = useFieldArray({
    control,
    name: `foods`,
  });

  const isMobile = useMediaQuery("(max-width: 640px)");
  const foodList = watch(`foods`);

  const handleAddFood = () => {
    setShowFoodSearchModal(true);
  };

  const handleAddNote = () => {
    setShowNotesModal(true);
  };

  return {
    showNotesModal,
    setShowNotesModal,
    isMobile,
    foodList,
    handleAddFood,
    handleAddNote,
    remove,
  };
};

export default useAddMealTable;
