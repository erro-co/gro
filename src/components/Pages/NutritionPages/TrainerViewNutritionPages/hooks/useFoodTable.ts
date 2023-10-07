import { emptyPlaceholderFood } from "@/lib/consts";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

type SortDirection = "ASC" | "DESC" | null;

const PAGE_SIZE = 10;

const useNutritionTables = () => {
  const [foods, setFoods] = useState<FoodWithServing[]>([]);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openEditFoodModal, setOpenEditFoodModal] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] =
    useState<FoodWithServing>(emptyPlaceholderFood);
  const [openConfirmDeleteActionModal, setOpenConfirmDeleteActionModal] =
    useState<boolean>(false);
  const supabase = createClientComponentClient<Database>();

  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);

  const getAllFoods = async (page: number) => {
    const offset = (page - 1) * PAGE_SIZE;
    const { data, error } = await supabase
      .from("food")
      .select(`*, serving(*, food)`)
      .ilike("name", `%${searchTerm}%`)
      .range(offset, offset + PAGE_SIZE - 1)
      .order(sortColumn || "name", {
        ascending: sortDirection !== "DESC",
      });

    if (error) {
      console.error("Failed to fetch error:", error);
    }

    setFoods(data as any);
    setDataFetched(true);
  };

  const getAllTemplateMeals = async (page: number) => {
    const offset = (page - 1) * PAGE_SIZE;
    const { data, error } = await supabase
      .from("meal")
      .select(`*, food(*, serving(*, food))`)
      .ilike("name", `%${searchTerm}%`)
      .range(offset, offset + PAGE_SIZE - 1)
      .order(sortColumn || "name", {
        ascending: sortDirection !== "DESC",
      });

    if (error) {
      console.error("Failed to fetch error:", error);
    }

    setFoods(data as any);
    setDataFetched(true);
  };

  const handleSortClick = async (column: string) => {
    let newSortDirection: SortDirection = null;
    if (sortDirection === null) {
      newSortDirection = "ASC";
    } else if (sortDirection === "ASC") {
      newSortDirection = "DESC";
    }
    setSortDirection(newSortDirection);
    setSortColumn(column);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const editFood = (food: FoodWithServing) => {
    setOpenEditFoodModal(true);
    setSelectedFood(food);
  };

  const handleDeleteFood = async (id: string) => {
    const { error } = await supabase.from("food").delete().match({ id: id });
    if (error) {
      console.error("Failed to delete food:", error);
    }
    setSelectedFood(emptyPlaceholderFood);
    setOpenConfirmDeleteActionModal(false);
    getAllFoods(currentPage);
  };

  useEffect(() => {
    getAllFoods(currentPage);
  }, [currentPage, searchTerm, sortDirection, sortColumn]);

  return {
    foods,
    dataFetched,
    searchTerm,
    sortColumn,
    selectedFood,
    setSortColumn,
    setSearchTerm,
    openEditFoodModal,
    setOpenEditFoodModal,
    editFood,
    currentPage,
    handleSortClick,
    handleNextPage,
    handlePreviousPage,
    handleDeleteFood,
    sortDirection,
  };
};

export default useNutritionTables;
