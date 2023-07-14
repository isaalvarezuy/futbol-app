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
import CustomLegend from "./CustomLegend";
import EmptyState from "../EmptyState/EmptyState";
import { BarChart2 } from "react-feather";

const TeamsGoalsPerGameChart = ({ teams }: { teams: Team[] }) => {
  const chartData = teams
    .filter((t) => t.games > 0)
    .map((t) => {
      return {
        name: t.name,
        imgUrl: t.crest,
        goals: t.goalsFor / t.games,
      };
    });
  return (
    <>
      {chartData.length ? (
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

export default TeamsGoalsPerGameChart;
