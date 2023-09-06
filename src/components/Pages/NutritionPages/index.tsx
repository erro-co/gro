"use client";
import { redirect } from "next/navigation";
import { FC, useEffect } from "react";
import Table from "./TrainerViewNutritionPages/table";

const NutritionPage: FC = () => {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("role") === "client"
    ) {
      redirect("/app/plans");
    }
  }, []);

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
