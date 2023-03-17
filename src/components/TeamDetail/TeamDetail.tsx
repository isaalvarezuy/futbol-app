import { Team } from "@/types/Team";
import { useParams } from "react-router-dom";
import TeamDetailsTable from "@/components/TeamDetailsTable/TeamDetailsTable";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";

import { Line } from "react-chartjs-2";
import ChartWrapper from "@/components/ChartWrapper/ChartWrapper";
import AddGameForm from "../AddGameForm/AddGameForm";
import AddPlayerForm from "../AddPlayerForm/AddPlayerForm";
import TeamPlayersTable from "../TeamPlayersTable/TeamPlayersTable";
import { Player } from "@/types/responses/Player";

interface Props {
  teams?: Team[];
  players?: Player[];
}
const TeamDetail = ({ teams, players }: Props) => {
  const { id } = useParams();
  const team = teams?.find((team) => team.id === id);
  const teamPlayers = players?.filter((player) => player.team === id);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  if (!team) {
    return <>go back</>;
  }

  const data = {
    datasets: [
      {
        label: "Goals scored",
        data: team.gameHistory.map((game) => game.goalsScored),
        borderColor: "#D1D5DB",
        backgroundColor: "#D1D5DB",
      },
      {
        label: "Goals received",
        data: team.gameHistory.map((game) => game.goalsReceived),
        borderColor: "#374151",
        backgroundColor: "#374151",
      },
    ],
    labels: team.gameHistory.map((game) => game.against.slice(0, 4)),
  };

  const playersData = {
    datasets: [
      {
        label: "Goals per game",
        data: teamPlayers?.map(player=>player.goals/team.games),
        borderColor: "#D1D5DB",
        backgroundColor: "#D1D5DB",
      },
    ],
    labels: teamPlayers?.map(player=>player.fullName),
  };

  const pieData = {
    labels: ["Wins", "Ties", "Losses"],
    datasets: [
      {
        data: [team.wins, team.ties, team.loses],
        backgroundColor: ["#D1D5DB", "#9CA3AF", "#374151"],
        borderWidth: 0,
      },
    ],
  };
  return (
    <div className="grid grid-cols-12 gap-4 p-8 ">
      <div className="grid grid-cols-8 col-span-9 gap-4 ">
        <div className="col-span-8">
          <TeamDetailsTable team={team} />
        </div>
        <div className="col-span-5">
          <ChartWrapper>
            <Line data={data} />
          </ChartWrapper>
        </div>
        <div className="col-span-3 ">
          <ChartWrapper>
            <Pie data={pieData} />
          </ChartWrapper>
        </div>
      </div>
      <div className="grid content-start grid-cols-3 col-span-3 gap-4 ">
        <div className="col-span-4">
          {teams && <AddGameForm teams={teams} />}
        </div>
        <div className=" col-span-4 ">
          {teams && <AddPlayerForm teams={teams} />}
        </div>
      </div>
      <div className="grid grid-cols-8 col-span-9 gap-4 ">
        <div className="col-span-5">
          {teamPlayers && id && <TeamPlayersTable players={teamPlayers} teamId={id} />}
        </div>
        <div className="col-span-3 ">
          <ChartWrapper>
            <Line data={playersData} />
          </ChartWrapper>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
