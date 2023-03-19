import TableCell from "@/components/TableCell/TableCell";
import TableRow from "@/components/TableRow/TableRow";
import TableWrapper from "@/components/TableWrapper/TableWrapper";
import { Player } from "@/types/responses/Player";

const PlayersTable = ({ players }: { players: Player[] }) => {
  const topScorers = players.slice(0, 5);
  return (
    <TableWrapper>
      <table className="w-full">
        <thead>
          <TableRow>
            <TableCell tag="th" className="text-left">
              Player
            </TableCell>
            <TableCell tag="th" className="text-right">
              Goals
            </TableCell>
          </TableRow>
        </thead>
        <tbody>
          {topScorers.map((p: Player) => (
            <TableRow key={p.id}>
              <TableCell className="text-left">
                <>{p.name}</>
              </TableCell>
              <TableCell className="text-right">{p.goals}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default PlayersTable;
