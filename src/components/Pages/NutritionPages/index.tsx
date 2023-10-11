"use client";
import Loading from "@/components/Loading";
import SearchBarWithAddButton from "@/components/SearchBarWithAddButton";
import Addbutton from "@/components/SearchBarWithAddButton/AddButton";
import { emptyPlaceholderFood } from "@/lib/consts";
import { groupAndSummarizeMealsByNutrition } from "@/lib/helpers";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { FC, useEffect, useState } from "react";
import NutritionTable from "./TrainerViewNutritionPages/NutritionTable";
import TemplateMealTable from "./TrainerViewNutritionPages/TemplateMealTable";
type SortDirection = "ASC" | "DESC" | null;

const PAGE_SIZE = 10;

const NutritionPage: FC = () => {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("role") === "client"
    ) {
      redirect("/app/plans");
    }
  }, []);

  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [foods, setFoods] = useState<FoodWithServing[]>([]);
  const [meals, setMeals] = useState<MealFormattedWithSummary[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openEditFoodModal, setOpenEditFoodModal] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] =
    useState<FoodWithServing>(emptyPlaceholderFood);
  const [openConfirmDeleteActionModal, setOpenConfirmDeleteActionModal] =
    useState<boolean>(false);

  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const fetchAllFoodsPagniated = async (page: number) => {
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
    setLoading(false);
  };

  const fetchTemplateMealsWithFoods = async () => {
    try {
      const { data: template_meals, error: template_meals_error } =
        await supabase
          .from("template_meal_food_serving")
          .select("meal(*), quantity, serving(*), food(*, food_category(*))");
      if (template_meals_error) {
        console.error("Failed to fetch template meals:", template_meals_error);
      }
      setMeals(groupAndSummarizeMealsByNutrition(template_meals as any));
    } catch (error) {
      console.error("Failed to fetch template meals:", error);
    }
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

  const handleEditFood = (food: FoodWithServing) => {
    setOpenEditFoodModal(true);
    setSelectedFood(food);
  };

  const handleDeleteFood = async (id: string) => {
    console.log("Deleting food with id:", id);
    const { error } = await supabase.from("food").delete().match({ id: id });
    if (error) {
      console.error("Failed to delete food:", error);
    }
    setSelectedFood(emptyPlaceholderFood);
    setOpenConfirmDeleteActionModal(false);
    fetchAllFoodsPagniated(currentPage);
  };

  useEffect(() => {
    fetchTemplateMealsWithFoods();
    fetchAllFoodsPagniated(currentPage);
  }, [currentPage, searchTerm, sortDirection, sortColumn]);

  if (loading) return <Loading />;

  return (
    <>
      <h1 className="text-3xl font-bold mb-12 text-center lg:text-left">
        Nutrition
      </h1>
      <SearchBarWithAddButton
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search for Meal..."
      />
      <div className="px-6 flex justify-between mt-4">
        <h2 className="my-auto font-semibold text-lg">Foods</h2>
        <Addbutton link="/app/nutrition/add" text="Add Foods" />
      </div>
      <div className="px-0 lg:px-6">
        <NutritionTable
          foods={foods}
          editFood={() => handleEditFood}
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          handleDeleteFood={handleDeleteFood}
          handleSortClick={handleSortClick}
          isMobile={isMobile}
          openEditFoodModal={openEditFoodModal}
          setOpenEditFoodModal={setOpenEditFoodModal}
          sortColumn={sortColumn || ""}
          sortDirection={sortDirection}
          selectedFood={selectedFood}
          setSelectedFood={() => setSelectedFood}
          openConfirmDeleteActionModal={openConfirmDeleteActionModal}
          setOpenConfirmDeleteActionModal={setOpenConfirmDeleteActionModal}
        />
      </div>

      <div className="px-6 flex justify-between mt-4">
        <h2 className="my-auto font-semibold text-lg">Meals</h2>
        <Addbutton link="/app/nutrition/meal/add" text="Add meal" />
      </div>

      <div className="px-0 lg:px-6">
        <TemplateMealTable meals={meals} isMobile={isMobile} />
      </div>
    </>
  );
};

export default NutritionPage;
