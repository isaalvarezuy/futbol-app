import { ExternalLink, Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";

const StandingsTableActions = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate(`/detail/${id}`);
  };
  return (
    <div>
      <button onClick={goToDetail}>
        <ExternalLink className="h-4 text-gray-800 hover:text-gray-600" />
      </button>
      <button>
        <Trash2 className="h-4 text-red-600 hover:text-red-400" />
      </button>
    </div>
  );
};

export default StandingsTableActions;
