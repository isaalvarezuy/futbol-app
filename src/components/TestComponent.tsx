import { Team } from "@/types/Team";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Paragraph from "./Paragraph/Paragraph";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    console.log(payload);
    return (
      <div className="bg-red-100 w-[300px] text-sm">
        <Paragraph size={16} weight="semibold">
          {payload[0].payload.name}
        </Paragraph>
        <Paragraph size={14} weight="semibold">
          {payload[0].payload.name}
        </Paragraph>
      </div>
    );
  }

  return null;
};

const CustomTick = ({ x, y, payload }: any) => {
  return <image x={x - 12} y={y} href={payload.value} width="24" height="24" />;
};

const TestComponent = ({ team }: { team: Team }) => {
  const data = team.gameHistory.map((game) => ({
    name: game.opponent.name,
    imgUrl: game.opponent.imgUrl,
    goalsScored: game.goalsFor,
    goalsReceived: game.goalsAgainst,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, left: 0, right: 7, bottom: 0 }}>
        <Line type="monotone" dataKey="goalsScored" stroke="#8884d8" />
        <Line type="monotone" dataKey="goalsReceived" stroke="#82ca9d" />
        <XAxis dataKey={"imgUrl"} interval={0} tick={<CustomTick />} />
        <Tooltip content={<></>} />
        <YAxis tick={{ fontFamily: "Quicksand", fontSize: "12px" }} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TestComponent;
