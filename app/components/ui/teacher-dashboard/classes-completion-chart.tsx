/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
  TooltipProps,
} from "recharts";

interface ChartData {
  name: string;
  Total: number;
  Completed: number;
  Hours: number;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const data: ChartData[] = [
  { name: "Polymer", Total: 5, Completed: 2.8, Hours: 5 },
  { name: "Urban", Total: 5, Completed: 3, Hours: 3 },
  { name: "Social", Total: 2, Completed: 2, Hours: 2 },
  { name: "Architecture", Total: 5, Completed: 4, Hours: 4 },
  { name: "Design", Total: 5, Completed: 3, Hours: 3 },
  { name: "Solar", Total: 5, Completed: 2.8, Hours: 4 },
];

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-md">
        <p className="font-bold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ClassesCompletionChart: React.FC = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="flex items-center">
        <div className="w-4 h-8 rounded-md bg-[#B6D7EB] mr-4"></div>
        <h1 className="text-xl font-bold">Completion | Classes</h1>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" tickLine={false} axisLine={false} />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="Total"
              fill="#E5E7EB"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="left"
              dataKey="Completed"
              fill="#60A5FA"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="left"
              dataKey="Hours"
              fill="#F97316"
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Completed"
              stroke="#2563EB"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClassesCompletionChart;
