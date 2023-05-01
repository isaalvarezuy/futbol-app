import { Team } from "@/types/Team";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomImageTick from "./CustomImageTick";

const TeamGoalsPerPlayer = ({ team }: { team: Team }) => {
  const chartData = team.players.map((p) => ({
    name: p.name,
    imgUrl: p.imgUrl,
    goals: p.goals / team.games,
  }));

  console.log(chartData);

  const data = [
    {
      name: "Page A",
      uv: 4000,
    },
    {
      name: "Page B",
      uv: 3000,
    },
    {
      name: "Page C",
      uv: 2000,
    },
    {
      name: "Page D",
      uv: 2780,
    },
    {
      name: "Page E",
      uv: 1890,
    },
    {
      name: "Page F",
      uv: 2390,
    },
    {
      name: "Page G",
      uv: 3490,
    },
  ];
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
        <XAxis dataKey={"imgUrl"} interval={0} tick={<CustomImageTick rounded={true} />} />
        <YAxis tick={{ fontFamily: "Quicksand", fontSize: "12px" }} />
        <Bar dataKey="goals" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TeamGoalsPerPlayer;

/* const playersData = {
    datasets: [
      {
        label: "Goals per game",
        data: team.players.map(
          (player) => player.goals / team.gameHistory.length
        ),
        borderColor: "#D1D5DB",
        backgroundColor: "#D1D5DB",
      },
    ],
    labels: team.players.map((player) => player.name),
  }; */
