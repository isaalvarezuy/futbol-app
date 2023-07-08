import { Player } from "@/types/responses/Player";
import { Trash2, UserX } from "react-feather";
import TableCell from "../TableCell/TableCell";
import TableRow from "../TableRow/TableRow";
import TableWrapper from "../TableWrapper/TableWrapper";
import { useState } from "react";
import DeletePlayerModal from "../Modal/components/DeletePlayerModal";
import EmptyState from "../EmptyState/EmptyState";

interface Props {
  players: Player[];
  teamId: string;
}
const TeamPlayersTable = ({ players, teamId }: Props) => {
  const [showDeletePlayerModal, setShowDeletePlayerModal] = useState(false);
  return (
    <TableWrapper>
      {players.length ? (
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
                <TableCell className="text-left">{p.number}</TableCell>
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
                <TableCell className="text-right">
                  <button onClick={() => setShowDeletePlayerModal(true)}>
                    <Trash2 className="h-4 text-red-600 hover:text-red-400" />
                  </button>
                  <DeletePlayerModal
                    isOpen={showDeletePlayerModal}
                    setIsOpen={setShowDeletePlayerModal}
                    player={p}
                  />
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyState
          icon={<UserX />}
          title={"No players have been added yet."}
          description={"Create your first player to see their stats."}
        />
      )}
    </TableWrapper>
  );
};

export default TeamPlayersTable;
