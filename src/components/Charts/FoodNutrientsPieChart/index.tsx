import { Nutrition } from "@/lib/schemas";
import { FC } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// const data = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
// ];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export interface IFoodNutrientsPieChart {
  nutrients: Nutrition | null;
}

const FoodNutrientsPieChart: FC<IFoodNutrientsPieChart> = ({ nutrients }) => {
  if (!nutrients) {
    return null;
  }
  const data = Object.entries(nutrients).map(([name, value], index) => ({
    name,
    value,
  }));

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minWidth={200}
      minHeight={200}
    >
      <PieChart>
        <Pie
          data={data}
          cx={90}
          cy={90}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default FoodNutrientsPieChart;
