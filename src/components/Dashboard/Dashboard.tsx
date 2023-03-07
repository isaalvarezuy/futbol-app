import { useQuery } from "react-query";

import { getTeams, getPlayers } from "@/services";
import PlayersTable from "@/components/PlayersTable/PlayersTable";
import StandingsTable from "@/components/StandingsTable/StandingsTable";

const Dashboard = () => {
  const { data: teams } = useQuery(["get-teams"], getTeams);
  const { data: players } = useQuery(["get-players"], getPlayers);

  if (!teams || !players) {
    return <p>Loading...</p>;
  }
  return (
    <div className=" p-8 grid grid-cols-12 gap-4">
      <div className=" col-span-8  grid grid-cols-8 gap-4">
        <div className="col-span-8">
          <StandingsTable teams={teams} />
        </div>
        <div className="col-span-3">
          <PlayersTable players={players} />
        </div>
        <div className="col-span-5 h-60 bg-gray-400"></div>
      </div>
      <div className=" col-span-4 bg-teal-200 grid grid-cols-4 gap-4 content-start">
        <div className="col-span-4 h-20 bg-gray-400"></div>
        <div className="col-span-4 h-20 bg-gray-400"></div>
      </div>

      <div>hola</div>
      <div>hola</div>
      <div>hola</div>
      <div>hola</div>
    </div>
  );
};

export default Dashboard;
