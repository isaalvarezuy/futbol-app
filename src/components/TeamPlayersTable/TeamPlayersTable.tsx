import { Player } from "@/types/responses/Player";
import { Trash2 } from "react-feather";
import TableCell from "../TableCell/TableCell";
import TableRow from "../TableRow/TableRow";
import TableWrapper from "../TableWrapper/TableWrapper";

interface Props {
  players: Player[];
  teamId: string;
}
const TeamPlayersTable = ({ players, teamId }: Props) => {
  const onRemoveTeam = () => {
    console.log("remove player");
  };
  return (
    <TableWrapper>
      <table className="w-full">
        <thead>
          <TableRow>
            <TableCell tag="th" className="text-left">
              #
            </TableCell>
            <TableCell tag="th" className="text-left">
              Player
            </TableCell>
            <TableCell tag="th" className="text-right">
              Goals
            </TableCell>
            <TableCell tag="th" className="text-right">
              {" "}
            </TableCell>
          </TableRow>
        </thead>
        <tbody>
          {players.map((p: Player) => (
            <TableRow key={p.id}>
              <TableCell className="text-left">
                <>{p.number}</>
              </TableCell>
              <TableCell className="text-left">
                <>{p.name}</>
              </TableCell>
              <TableCell className="text-right">{p.goals}</TableCell>
              <TableCell className="text-right">
                <button onClick={onRemoveTeam}>
                  <Trash2 className="h-4 text-red-600 hover:text-red-400" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default TeamPlayersTable;
