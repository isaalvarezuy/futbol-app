import Button from "@/components/Button/Button";
import Modal from "../Modal";
import { Trash2 } from "react-feather";
import ModalIconWrapper from "./ModalIconWrapper";
import { Team } from "@/types/Team";
import { useMutation, useQueryClient } from "react-query";
import { deleteTeam } from "@/services/teams/teams";
import { showNotification } from "@/utils/showNotification";

interface Props {
  isOpen: boolean;
  setIsOpen: any;
  team: Team;
}
const DeleteTeamModal = ({ isOpen, setIsOpen, team }: Props) => {
  const queryClient = useQueryClient();
  const handleSuccess = () => {
    showNotification("Team was deleted succesfully", 500, "success");
    queryClient.invalidateQueries("get-teams");
    setIsOpen(false);
  };
  const { mutate } = useMutation(deleteTeam, {
    onSuccess: handleSuccess,
  });

  const primaryButton = <Button onClick={() => mutate(team.id)}>Delete</Button>;

  const secondaryButton = (
    <Button onClick={() => setIsOpen(false)} variant="secondary">
      Cancel
    </Button>
  );
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Delete team"
      description={`Are you sure you want to delete ${team.name}, and its ${team.players.length} players? This action cannot be undone.`}
      icon={<ModalIconWrapper Icon={Trash2} type="error" />}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
    />
  );
};

export default DeleteTeamModal;
