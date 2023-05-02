import { ExternalLink, Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import DeleteTeamModal from "../Modal/components/DeleteTeamModal";
import { useState } from "react";
import { Team } from "@/types/Team";

const StandingsTableActions = ({ team }: { team: Team }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate(`/detail/${team.id}`);
  };
  return (
    <div>
      <button onClick={goToDetail}>
        <ExternalLink className="h-4 text-gray-800 hover:text-gray-600" />
      </button>
      <button onClick={() => setShowDeleteModal(true)}>
        <Trash2 className="h-4 text-red-600 hover:text-red-400" />
      </button>{" "}
      <DeleteTeamModal
        isOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        team={team}
      />
    </div>
  );
};

export default StandingsTableActions;
