import { Player } from "@/types/responses/Player";
import React, { Dispatch, SetStateAction } from "react";
import ModalIconWrapper from "./ModalIconWrapper";
import { Trash2 } from "react-feather";
import Button from "@/components/Button/Button";
import Modal from "../Modal";
import { useMutation, useQueryClient } from "react-query";
import { showNotification } from "@/utils/showNotification";
import { usePlayers } from "@/hooks/services/players/usePlayers";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  player: Player;
}

const DeletePlayerModal = ({ isOpen, setIsOpen, player }: Props) => {
  const { deletePlayer } = usePlayers();
  const queryClient = useQueryClient();
  const handleSuccess = () => {
    showNotification(`${player.name} was deleted succesfully`, 500, "success");
    queryClient.invalidateQueries("get-team");
    setIsOpen(false);
  };
  const { mutate } = useMutation(deletePlayer, {
    onSuccess: handleSuccess,
  });

  const primaryButton = (
    <Button onClick={() => mutate(player.id)}>Delete</Button>
  );

  const secondaryButton = (
    <Button onClick={() => setIsOpen(false)} variant="secondary">
      Cancel
    </Button>
  );

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Delete player"
      description={`Are you sure you want to delete ${player.name}? This action cannot be undone.`}
      icon={<ModalIconWrapper Icon={Trash2} type="error" />}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
    />
  );
};

export default DeletePlayerModal;
