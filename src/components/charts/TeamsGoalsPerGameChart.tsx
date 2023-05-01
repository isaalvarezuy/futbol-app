import { Team } from "@/types/Team";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomImageTick from "./CustomImageTick";

const TeamsGoalsPerGameChart = ({ teams }: { teams: Team[] }) => {
  const chartData = teams.map((t) => {
    console.log(t);
    return {
      name: t.name,
      imgUrl: t.crest,
      goals: t.goalsFor / t.games,
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey={"imgUrl"}
          interval={0}
          tick={<CustomImageTick rounded={true} />}
        />
        <YAxis tick={{ fontFamily: "Quicksand", fontSize: "12px" }} />
        <Bar dataKey="goals" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TeamsGoalsPerGameChart;
