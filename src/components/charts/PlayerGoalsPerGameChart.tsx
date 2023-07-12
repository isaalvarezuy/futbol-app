import { Team } from "@/types/models/Team";

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
import EmptyState from "../EmptyState/EmptyState";
import { BarChart2 } from "react-feather";

const PlayerGoalsPerGame = ({ team }: { team: Team }) => {
  const chartData = team.players.map((p) => {
    return {
      name: p.name,
      imgUrl: p.photo,
      goals: p.goals / team.games,
    };
  });

  return (
    <>
      {team.players.length ? (
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
      ) : (
        <EmptyState
          icon={<BarChart2 />}
          title={"No games have been added yet."}
          description={"Add your first game to see these stats."}
        />
      )}
    </>
  );
};

export default PlayerGoalsPerGame;
