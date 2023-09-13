import { FC } from "react";
import { Cell, Label, Pie, PieChart } from "recharts";

const COLORS = ["#F695A0", "#DC7CDE", "#A351FA"];

export interface IFoodNutrientsPieChart {
  food: Food | null;
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  text?: string;
}

const FoodNutrientsPieChart: FC<IFoodNutrientsPieChart> = ({
  food,
  width,
  height,
  innerRadius,
  outerRadius,
  text,
}) => {
  if (!food) {
    return null;
  }
  const data = [
    {
      name: "Protein",
      value: food.protein,
    },
    {
      name: "Fat",
      value: food.total_fat,
    },
    {
      name: "Carbs",
      value: food.total_carbohydrate,
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
