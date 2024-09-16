"use client";

import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Completed", value: 77 },
  { name: "To Start", value: 23 },
];

const COLORS = ["#8884d8", "#e0e0e0"];

const ProgressChart = () => {
  return (
    <div className="p-4 bg-white">
      <div className="flex items-center mb-4">
        <div className="w-4 h-8 rounded-md bg-[#CDC4FD] mr-4"></div>
        <h1 className="text-sm font-bold text-black">
          Class Progressive Statistics
        </h1>
      </div>
      <PieChart width={200} height={200}>
        <Pie data={data} dataKey="value" outerRadius={80} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="text-center text-black mt-4">
        <p>77% Course Completed</p>
        <p>23% To Start</p>
      </div>
    </div>
  );
};

export default ProgressChart;
