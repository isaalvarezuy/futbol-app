import { Team } from "@/types/Team";
import {  useParams } from "react-router-dom";
import TeamDetailsTable from "@/components/TeamDetailsTable/TeamDetailsTable";
interface Props {
  teams?: Team[];
}
const TeamDetail = ({ teams }: Props) => {
  const { id } = useParams();
  const team = teams?.find((team) => team.id === id);
  if (!team) {
    return <>go back</>
  }
  return (
    <div className="grid grid-cols-12 gap-4 p-8 ">
      <div className="grid grid-cols-8 col-span-8 gap-4 ">
        <div className="col-span-8">

           <TeamDetailsTable team={team} />
        </div>
        <div className="col-span-3">
          {/*  <PlayersTable players={players} /> */}
        </div>
        <div className="col-span-5 bg-gray-400 h-60"></div>
      </div>
      <div className="grid content-start grid-cols-4 col-span-4 gap-4 bg-teal-200 ">
        <div className="h-20 col-span-4 bg-gray-400"></div>
        <div className="h-20 col-span-4 bg-gray-400"></div>
      </div>

      <div>hola</div>
      <div>hola</div>
      <div>hola</div>
      <div>hola</div>
    </div>
  );
};

export default TeamDetail;
