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
import { useQuery } from "react-query";
import { getTeam } from "@/services/teams/teams";
import { useStore } from "@/hooks/useStore";
import TeamDetailSkeleton from "../Skeletons/TeamDetailSkeleton";
import TestComponent from "../TestComponent";
import TeamGoalsPerGame from "../charts/TeamGoalsPerGameChart";
import TeamResultsChart from "../charts/TeamResultsChart";
import TeamGoalsPerPlayer from "../charts/TeamGoalsPerPlayer";

const TeamDetail = () => {
  const { id } = useParams();
  const teams = useStore((state) => state.teams);
  const { data: team, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTeam(id!),
    enabled: !!id || !!teams,
  });

  if (!team) {
    return <TeamDetailSkeleton />;
  }

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

  

  return (
    <div className="grid grid-cols-12 gap-4 p-8 ">
      <div className="grid grid-cols-8 col-span-9 gap-4 content-start ">
        <div className="col-span-8">
          <TeamDetailsTable team={team} />
        </div>
        <div className="col-span-5">
          <ChartWrapper>
            <TeamGoalsPerGame team={team} />
          </ChartWrapper>
        </div>
        <div className="col-span-3 ">
          <ChartWrapper>
            <TeamResultsChart team={team} />
          </ChartWrapper>
        </div>
        <div className="col-span-5">
          {team.players && id && (
            <TeamPlayersTable players={team.players} teamId={id} />
          )}
        </div>
        <div className="col-span-3 ">
          <ChartWrapper>
            <TeamGoalsPerPlayer team={team} />
          </ChartWrapper>
        </div>
      </div>
      <div className="grid content-start grid-cols-3 col-span-3 gap-4 ">
        <div className="col-span-4">
          {teams && <AddGameForm teams={teams} />}
        </div>
        <div className=" col-span-4 ">
          {id && <AddPlayerForm teamId={id} />}
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
