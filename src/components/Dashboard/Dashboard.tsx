import { useQuery } from "react-query";
import PlayersTable from "@/components/PlayersTable/PlayersTable";
import StandingsTable from "@/components/StandingsTable/StandingsTable";
import AddTeamForm from "@/components/AddTeamForm/AddTeamForm";
import DashboardSkeleton from "@/components/Skeletons/DashboardSkeleton";
import { useStore } from "@/hooks/useStore";
import TeamsGoalsPerGameChart from "../charts/TeamsGoalsPerGameChart";
import ChartWrapper from "../ChartWrapper/ChartWrapper";
import { usePlayers } from "@/hooks/services/players/usePlayers";

const Dashboard = () => {
  const teams = useStore((state) => state.teams);
  const { getPlayers } = usePlayers();

  const { data: players } = useQuery(["get-players"], getPlayers);
  if (!teams || !players) {
    return <DashboardSkeleton />;
  }
  return (
    <div className="grid grid-cols-12 gap-4 p-8 ">
      <div className="grid grid-cols-8 col-span-8 gap-4 ">
        <div className="col-span-8">
          <StandingsTable teams={teams} />
        </div>
        <div className="col-span-3">
          <PlayersTable players={players} />
        </div>
        <div className="col-span-5 h-60">
          <ChartWrapper>
            <TeamsGoalsPerGameChart teams={teams} />
          </ChartWrapper>
        </div>
      </div>
      <div className="grid content-start grid-cols-4 col-span-4 gap-4 ">
        <div className="col-span-4">
          <AddTeamForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
