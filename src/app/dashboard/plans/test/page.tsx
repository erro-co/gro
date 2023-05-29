"use client";
import DisplayMealTable from "@/components/table/DisplayMealTable";
import { supabase } from "@/lib/supabase";
import { FC, useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  {
    name: "Protein",
    value: 100,
  },
  {
    name: "Fats",
    value: 100,
  },
  {
    name: "Carbs",
    value: 100,
  },
];

const DisplayMealPage: FC = () => {
  const [mealPlan, setMealPlan] = useState<any>({});
  const getMealPlanData = async () => {
    const { data, error } = await supabase.from("meal_plan").select("*");
    console.log("data", data);
  };

  useEffect(() => {
    getMealPlanData();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold">My Plan</h1>
      {/* {mealPlan.meals.map((meal: Meal, idx: number) => (
        <DisplayMealPlanTable meal={meal} key={idx} />
      ))} */}

      <div className="w-full my-12 flex border-4 border-gro-pink/50 rounded-lg p-4">
        <div>
          <PieChart width={180} height={200}>
            <Pie
              data={data}
              cx={90}
              cy={90}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div>
          <div>
            <p className="text-center text-xl font-bold pb-2">Meal Name</p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Reiciendis fugiat veniam nemo voluptas repellendus, id sint
              cupiditate quos nulla laudantium? Dolorem tempora quam eius modi
              et sit ab maxime hic.
            </p>
          </div>
        </div>
      </div>
      <DisplayMealTable />
      <DisplayMealTable />
      <DisplayMealTable />
      <DisplayMealTable />
    </div>
  );
};

export default DisplayMealPage;
