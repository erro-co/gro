import { Nutrition } from "@/lib/schemas";
import { FC } from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export interface IFoodNutrientsPieChart {
  nutrients: Nutrition | null;
}

const FoodNutrientsPieChart: FC<IFoodNutrientsPieChart> = ({ nutrients }) => {
  console.log({ nutrients });
  if (!nutrients) {
    return null;
  }
  const data = Object.entries(nutrients).map(([name, value]) => {
    if (name === "saturated_fat" || name === "trans_fat") {
      return {
        name: "fat",
        value: nutrients.saturated_fat + nutrients.trans_fat,
      };
    } else if (name === "saturatedFat" || name === "transFat") {
      return {
        name: "fat",
        value: nutrients.saturated_fat + nutrients.trans_fat,
      };
    } else {
      return { name, value };
    }
  });

  return (
    <PieChart width={300} height={200}>
      <Pie
        data={data}
        cx={90}
        cy={90}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={2}
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
