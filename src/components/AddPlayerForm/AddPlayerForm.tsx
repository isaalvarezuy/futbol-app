import { Team } from "@/types/models/Team";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button/Button";
import CardWrapper from "../CardWrapper/CardWrapper";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../Input/Input";
import Select from "../Select/Select";
import FileInput from "../FileInput/FileInput";
import { Camera, Shield } from "react-feather";

import { playerSchema } from "@/schemas/player.schema";
import { useEffect } from "react";
import Paragraph from "../Paragraph/Paragraph";
import { useMutation, useQueryClient } from "react-query";
import { showNotification } from "@/utils/showNotification";
import { usePlayers } from "@/hooks/services/players/usePlayers";
import FieldWrapper from "../FieldWrapper/FieldWrapper";

const AddPlayerForm = ({ teamId }: { teamId: string }) => {
  const { addPlayer } = usePlayers();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(playerSchema) });

  const queryClient = useQueryClient();

  const handleFormSuccess = () => {
    reset();
    queryClient.invalidateQueries("get-players");
    queryClient.invalidateQueries("get-team");
    showNotification("Player added correctly", 2000, "success");
  };

  const { mutate, isLoading } = useMutation(addPlayer, {
    onSuccess: handleFormSuccess,
    onError: () => console.log("error"),
  });

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("photo", data.photo[0]);
    formData.append("number", data.number);
    formData.append("teamId", teamId);
    mutate(formData);
  };

  const hasErrors = Object.keys(errors).length > 0;
  const firstError = Object.keys(errors)[0];

  return (
    <CardWrapper title="Add Player">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
      >
        <section className="flex gap-2">
          <FileInput
            Placeholder={Camera}
            label="photo"
            {...register("photo")}
            error={errors["photo"]}
          />
          <section className="flex w-16 gap-1 items-center">
            #
            <Input errors={errors} type="text" {...register(`number`)} />
          </section>
        </section>

        <FieldWrapper label="Name">
          <Input errors={errors} type="text" {...register(`name`)} />
        </FieldWrapper>
        {hasErrors && (
          <Paragraph color="text-red-600">
            {errors[firstError]?.message as string}
          </Paragraph>
        )}
        <Button type="submit" loading={isLoading}>
          Add Player
        </Button>
      </form>
    </CardWrapper>
  );
};

export default AddPlayerForm;
