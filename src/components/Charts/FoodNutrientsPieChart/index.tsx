import { Nutrition } from "@/lib/schemas";
import { FC } from "react";
import { Cell, Label, Pie, PieChart } from "recharts";

const COLORS = ["#F695A0", "#DC7CDE", "#A351FA"];

export interface IFoodNutrientsPieChart {
  nutrients: Nutrition | null;
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  text?: string;
}

const FoodNutrientsPieChart: FC<IFoodNutrientsPieChart> = ({
  nutrients,
  width,
  height,
  innerRadius,
  outerRadius,
  text,
}) => {
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
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        <Label value={text} position="center" className="text-sm" />
      </Pie>
    </PieChart>
  );
};

export default FoodNutrientsPieChart;
