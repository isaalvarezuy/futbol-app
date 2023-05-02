import { Team } from "@/types/Team";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomImageTick from "./CustomImageTick";
import CustomLegend from "./CustomLegend";

const PlayerGoalsPerGame = ({ team }: { team: Team }) => {
  const chartData = team.players.map((p) => {
    return {
      name: p.name,
      imgUrl: p.imgUrl,
      goals: p.goals / team.games,
    };
  });

  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 10,
          left: -15,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey={"imgUrl"}
          interval={0}
          tick={<CustomImageTick rounded={true} />}
        />
        <YAxis tick={{ fontFamily: "Quicksand", fontSize: "12px" }} />
        <Bar dataKey="goals" fill="#374151" />
        <Legend
          verticalAlign="top"
          content={<CustomLegend title="Goals per game" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PlayerGoalsPerGame;
