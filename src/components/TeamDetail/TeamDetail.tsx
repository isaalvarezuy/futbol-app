import { Team } from "@/types/Team";
import { useParams } from "react-router-dom";
import TeamDetailsTable from "@/components/TeamDetailsTable/TeamDetailsTable";

import { Line } from "react-chartjs-2";
import ChartWrapper from "@/components/ChartWrapper/ChartWrapper";
import AddGameForm from "../AddGameForm/AddGameForm";
import AddPlayerForm from "../AddPlayerForm/AddPlayerForm";
import TeamPlayersTable from "../TeamPlayersTable/TeamPlayersTable";
import { useQuery } from "react-query";
import { useStore } from "@/hooks/useStore";
import TeamDetailSkeleton from "../Skeletons/TeamDetailSkeleton";

import TeamGoalsPerGameChart from "../charts/TeamGoalsPerGameChart";
import TeamResultsChart from "../charts/TeamResultsChart";
import PlayerGoalsPerGame from "../charts/PlayerGoalsPerGameChart";
import { useTeams } from "@/hooks/services/teams/useTeams";
import { useSession } from "@/hooks/useSession";
import classNames from "classnames";

const TeamDetail = () => {
  const { getTeam } = useTeams();
  const { id } = useParams();
  const teams = useStore((state) => state.teams);
  const { data: team, isLoading } = useQuery({
    queryKey: ["get-team", id],
    queryFn: () => getTeam(id!),
    enabled: !!id || !!teams,
  });

  const userTeam = useSession((state) => state.user?.teamId);
  const isUserTeam = userTeam === id;
  if (!team) {
    return <TeamDetailSkeleton />;
  }

  return (
    <div
      className={classNames(
        "grid gap-4 p-8",
        isUserTeam ? "grid-cols-12" : "grid-cols-8"
      )}
    >
      <div className="grid grid-cols-8 col-span-9 gap-4 content-start ">
        <div className="col-span-8">
          <TeamDetailsTable team={team} />
        </div>
        <div className="col-span-5">
          {team && (
            <ChartWrapper>
              <TeamGoalsPerGameChart team={team} />
            </ChartWrapper>
          )}
        </div>
        <div className="col-span-3 ">
          {team && (
            <ChartWrapper>
              <TeamResultsChart team={team} />
            </ChartWrapper>
          )}
        </div>
        <div className="col-span-5">
          {team.players && id && (
            <TeamPlayersTable players={team.players} teamId={id} />
          )}
        </div>
        <div className="col-span-3 ">
          <ChartWrapper>
            <PlayerGoalsPerGame team={team} />
          </ChartWrapper>
        </div>
      </div>
      {isUserTeam && (
        <div className="grid content-start grid-cols-3 col-span-3 gap-4 ">
          <div className="col-span-4">
            {teams && <AddGameForm teams={teams} />}
          </div>
          <div className=" col-span-4 ">
            {id && <AddPlayerForm teamId={id} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetail;
