import TableCell from "@/components/TableCell/TableCell";
import TableRow from "@/components/TableRow/TableRow";
import TableWrapper from "@/components/TableWrapper/TableWrapper";
import { Player } from "@/types/responses/Player";

const PlayersTable = ({ players }: { players: Player[] }) => {
  return (
    <TableWrapper>
      <table className="w-full">
        <thead>
          <TableRow>
            <TableCell tag="th" className="text-left">
              Jugador
            </TableCell>
            <TableCell tag="th" className="text-right">
              Goles
            </TableCell>
          </TableRow>
        </thead>
        <tbody>
          {players.map((p: Player) => (
            <TableRow key={p.id}>
              <TableCell className="text-left">
                <>{p.fullName}</>
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
