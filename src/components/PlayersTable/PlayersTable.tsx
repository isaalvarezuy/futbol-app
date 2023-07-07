import TableCell from "@/components/TableCell/TableCell";
import TableRow from "@/components/TableRow/TableRow";
import TableWrapper from "@/components/TableWrapper/TableWrapper";
import { Player } from "@/types/responses/Player";
import EmptyState from "../EmptyState/EmptyState";
import { ShieldOff } from "react-feather";

const PlayersTable = ({ players }: { players: Player[] }) => {
  const topScorers = players.slice(0, 5);

  return (
    <TableWrapper>
      {players.length ? (
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
                  <div className="flex items-center gap-1">
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="h-6 w-6 object-cover"
                    />
                    {p.name}
                  </div>
                </TableCell>
                <TableCell className="text-right">{p.goals}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyState
          icon={<ShieldOff />}
          title={"No players have been added yet."}
          description={"Create your first player to see their stats."}
        />
      )}
    </TableWrapper>
  );
};

export default PlayersTable;
