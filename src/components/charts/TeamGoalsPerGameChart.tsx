import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomImageTick from "./CustomImageTick";
import { Team } from "@/types/Team";
import CustomLegend from "./CustomLegend";
import EmptyState from "../EmptyState/EmptyState";
import { Database, Target } from "react-feather";

const TeamGoalsPerGame = ({ team }: { team: Team }) => {
  const data = team.gameHistory.map((game) => ({
    name: game.opponent.name,
    imgUrl: game.opponent.imgUrl,
    goalsScored: game.goalsFor,
    goalsReceived: game.goalsAgainst,
  }));

  const legendData = {
    type: "line-chart",
    data: [
      { label: "Goals Scored", color: "#9CA3AF" },
      { label: "Goals Received", color: "#374151" },
    ],
  };

  return (
    <>
      {team.gameHistory.length ? (
        <ResponsiveContainer width="100%">
          <LineChart
            data={data}
            margin={{ top: 5, left: 0, right: 7, bottom: 0 }}
          >
            <Line
              type="monotone"
              dataKey="goalsScored"
              className="bg-red-100 border border-teal-300"
              stroke="#9CA3AF"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="goalsReceived"
              stroke="#374151"
              strokeWidth={2}
            />
            <XAxis dataKey={"imgUrl"} interval={0} tick={<CustomImageTick />} />
            <Tooltip content={<></>} />
            <YAxis tick={{ fontFamily: "Quicksand", fontSize: "12px" }} />
            <Legend
              verticalAlign="top"
              height={36}
              content={<CustomLegend legendData={legendData} />}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <EmptyState
          icon={<Database />}
          title={"Not enough data"}
          description="Add a game to start seeing stats."
        />
      )}
    </>
  );
};

export default TeamGoalsPerGame;
