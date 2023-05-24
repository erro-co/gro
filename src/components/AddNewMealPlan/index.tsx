import { FC, useEffect, useState } from "react";
import SearchBarButton from "./SearchBarButton";
import AddFoodModal from "./AddFoodModal";
import AddMealTable from "./AddMealTable";
import { supabase } from "@/lib/supabase";
import { FoodItem } from "@/lib/types";

const AddNewMealPlan: FC = () => {
  const [showFoodSearchModal, setShowFoodSearchModal] = useState(false);

  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  const fetchAllFoods = async () => {
    const { data: all_foods } = await supabase.from("food").select("*");
    setFoods(all_foods as FoodItem[]);
    setDataFetched(true);
  };

  useEffect(() => {
    fetchAllFoods();
  }, []);

  return (
    <>
      <AddFoodModal
        open={showFoodSearchModal}
        setOpen={setShowFoodSearchModal}
      />
      <div className="flex flex-col h-full">
        <AddMealTable />
        <button
          className="mt-auto cursor-pointer"
          onClick={() => setShowFoodSearchModal(true)}
        >
          <SearchBarButton />
        </button>
      </div>
    </>
  );
};

export default AddNewMealPlan;
