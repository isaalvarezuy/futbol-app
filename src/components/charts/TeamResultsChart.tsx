import { Team } from "@/types/Team";
import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import CustomLegend from "./CustomLegend";

const TeamResultsChart = ({ team }: { team: Team }) => {
  const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
  ];

  const data = [
    { name: "Wins", value: team.wins },
    { name: "Loses", value: team.loses },
    { name: "Ties", value: team.ties },
  ];

  const legendData = {
    type: "pie-chart",
    data: [
      { label: "Wins", color: "#D1D5DB" },
      { label: "Loses", color: "#374151" },
      { label: "Ties", color: "#9CA3AF" },
    ],
  };

  const COLORS = ["#D1D5DB", "#374151", "#9CA3AF"];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie dataKey="value" data={data} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="top"
          content={<CustomLegend legendData={legendData} />}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TeamResultsChart;
