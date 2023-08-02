"use client";
import { redirect } from "next/navigation";
import Table from "./TrainerViewNutritionPages/table";
import { FC } from "react";

const NutritionPage: FC = () => {
  if (
    typeof window !== "undefined" &&
    localStorage.getItem("role") === "client"
  ) {
    redirect("/dashboard/plans");
  }
  return (
    <>
      <h1 className="text-3xl font-bold mb-12 text-center lg:text-left">
        Foods
      </h1>
      <div className="px-0 lg:px-6">
        <Table />
      </div>
    </>
  );
};

export default NutritionPage;
