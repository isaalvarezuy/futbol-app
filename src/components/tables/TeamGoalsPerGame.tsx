import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomImageTick from "./CustomImageTick";
import { Team } from "@/types/Team";

const TeamGoalsPerGame = ({ team }: { team: Team }) => {
  const data = team.gameHistory.map((game) => ({
    name: game.opponent.name,
    imgUrl: game.opponent.imgUrl,
    goalsScored: game.goalsFor,
    goalsReceived: game.goalsAgainst,
  }));

  return (
    <ResponsiveContainer width="100%" height="90%">
      <LineChart data={data} margin={{ top: 5, left: 0, right: 7, bottom: 0 }}>
        <Line type="monotone" dataKey="goalsScored" stroke="#8884d8" />
        <Line type="monotone" dataKey="goalsReceived" stroke="#82ca9d" />
        <XAxis dataKey={"imgUrl"} interval={0} tick={<CustomImageTick />} />
        <Tooltip content={<></>} />
        <YAxis tick={{ fontFamily: "Quicksand", fontSize: "12px" }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TeamGoalsPerGame;
