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
  ComposedChart,
  TooltipProps,
} from "recharts";

interface ChartData {
  name: string;
  Total: number;
  Theory: number;
  Practical: number;
  QualifyingMarks: number;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const data: ChartData[] = [
  {
    name: "Polymer",
    Total: 100,
    Theory: 40,
    Practical: 50,
    QualifyingMarks: 40,
  },
  { name: "Urban", Total: 100, Theory: 60, Practical: 40, QualifyingMarks: 40 },
  {
    name: "Social",
    Total: 100,
    Theory: 30,
    Practical: 70,
    QualifyingMarks: 40,
  },
  {
    name: "Architecture",
    Total: 100,
    Theory: 50,
    Practical: 50,
    QualifyingMarks: 40,
  },
  {
    name: "Design",
    Total: 100,
    Theory: 55,
    Practical: 35,
    QualifyingMarks: 40,
  },
  { name: "Solar", Total: 100, Theory: 40, Practical: 50, QualifyingMarks: 40 },
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

const MarksDistribution: React.FC = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="flex items-center">
        <div className="w-4 h-8 rounded-md bg-[#B6D7EB] mr-4"></div>
        <h1 className="text-xl font-bold">Subject Distribution Marks</h1>
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
              fill="#C5E7D2"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="left"
              dataKey="Theory"
              fill="#60A5FA"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="left"
              dataKey="Practical"
              fill="#F97316"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="left"
              dataKey="QualifyingMarks"
              fill="#FAC6AA"
              radius={[4, 4, 0, 0]}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarksDistribution;
