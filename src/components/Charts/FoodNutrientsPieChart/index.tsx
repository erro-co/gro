import { Nutrition } from "@/lib/schemas";
import { FC } from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#F695A0", "#DC7CDE", "#A351FA"];

export interface IFoodNutrientsPieChart {
  nutrients: Nutrition | null;
}

const FoodNutrientsPieChart: FC<IFoodNutrientsPieChart> = ({ nutrients }) => {
  if (!nutrients) {
    return null;
  }
  const data = [
    {
      name: "Protein",
      value: nutrients.protein,
    },
    {
      name: "Fat",
      value: nutrients.total_fat,
    },
    {
      name: "Carbs",
      value: nutrients.total_carbs,
    },
  ];

  return (
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
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default FoodNutrientsPieChart;
