
import PlayersTable from "@/components/PlayersTable/PlayersTable";
import StandingsTable from "@/components/StandingsTable/StandingsTable";
import { Player } from "@/types/responses/Player";
import { Team } from "@/types/Team";
import AddTeamForm from "../AddTeamForm/AddTeamForm";

interface Props {
  teams?: Team[];
  players?: Player[];
}
const Dashboard = ({ teams, players }: Props) => {
  if (!teams || !players) {
    return <p>Loading...</p>;
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
        <div className="col-span-5 bg-gray-400 h-60"></div>
      </div>
      <div className="grid content-start grid-cols-4 col-span-4 gap-4 bg-teal-200 ">
        <div className="col-span-4">
          <AddTeamForm />
        </div>

        <div className="h-20 col-span-4 bg-gray-400"></div>
      </div>

      <div>hola</div>
      <div>hola</div>
      <div>hola</div>
      <div>hola</div>
    </div>
  );
};

export default Dashboard;
