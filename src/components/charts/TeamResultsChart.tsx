import { Team } from "@/types/Team";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import CustomLegend from "./CustomLegend";
import EmptyState from "../EmptyState/EmptyState";
import { PieChart as PieChartIcon } from "react-feather";

const TeamResultsChart = ({ team }: { team: Team }) => {
  const { wins, loses, ties } = team;
  const amountOfGames = wins + loses + ties;
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
    <>
      {amountOfGames ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie dataKey="value" data={data} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              verticalAlign="top"
              content={<CustomLegend legendData={legendData} />}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <EmptyState
          icon={<PieChartIcon />}
          title={"Not enough data"}
          description="Add a game to start seeing stats."
        />
      )}
    </>
  );
};

export default TeamResultsChart;
