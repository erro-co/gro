"use client";
import Loading from "@/components/Loading";
import ConfirmationModal from "@/components/Pages/MealPlanPages/TrainerViewMealPlanPages/CreatePlanPage/ConfirmationModal";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { CheckIcon, PencilIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import AddFoodModal from "../InsertFoodModal";
import AddMealTable from "../MealTable";
import useCreatePlan from "./hooks/useCreateMeal";

const CreatePlan: FC = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const {
    showFoodSearchModal,
    setShowFoodSearchModal,
    register,
    handleSubmit,
    onSubmit,
    showLoading,
    setShowLoading,
    view,
  } = useCreatePlan();

  const formContext = useFormContext();
  console.log({ formContext });

  switch (view) {
    case "createMeal":
      return (
        <>
          <ConfirmationModal isOpen={showLoading} setIsOpen={setShowLoading} />
          <form
            className="flex flex-col h-full -mt-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <AddFoodModal
              open={showFoodSearchModal}
              setOpen={setShowFoodSearchModal}
            />
            <div className="w-full flex">
              <div className="w-full lg:w-fit lg:mx-auto shadow border border-gray-200 rounded-lg flex p-2 focus-within:border-indigo-500">
                <input
                  type="text"
                  {...register("name")}
                  className="text-normal lg:text-2xl font-semibold focus:outline-none w-full"
                />
                <PencilIcon className="w-6 text-gray-400" />
              </div>
            </div>

            <AddMealTable setShowFoodSearchModal={setShowFoodSearchModal} />
            <div className="mt-auto flex w-full mb-4">
              <button
                type="submit"
                className="mx-auto flex border px-4 py-2 lg:py-4 rounded-md  text-white bg-green-500 disabled:opacity-70"
              >
                {isMobile ? <p>Create</p> : <p>Create Meal</p>}
                <div className="ml-2">
                  <CheckIcon className="w-6" />
                </div>
              </button>
            </div>
          </form>
        </>
      );
    case "loading":
      return <Loading />;
    default:
      return <></>;
  }
};

export default CreatePlan;
