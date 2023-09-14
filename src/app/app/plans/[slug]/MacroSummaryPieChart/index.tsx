import { FC } from "react";
import { Cell, Label, Pie, PieChart } from "recharts";

export interface IMacroSummaryPieChart {
  macros: any;
  totalCalories: number;
}

const COLORS = ["#F695A0", "#DC7CDE", "#A351FA"];
const MacroSummaryPieChart: FC<IMacroSummaryPieChart> = ({
  macros,
  totalCalories,
}) => {
  return (
    <PieChart width={120} height={120}>
      <Pie
        data={macros}
        innerRadius={55}
        outerRadius={60}
        stroke="none"
        paddingAngle={4}
        dataKey="value"
      >
        {macros.map((_: any, index: number) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        <Label
          value={`${totalCalories.toString()} Cals`}
          position="center"
          fill="#000000"
          fontSize={15}
        />
      </Pie>
    </PieChart>
  );
};

export default MacroSummaryPieChart;
