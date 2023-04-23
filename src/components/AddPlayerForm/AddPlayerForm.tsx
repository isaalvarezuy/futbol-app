import { Team } from "@/types/Team";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button/Button";
import CardWrapper from "../CardWrapper/CardWrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../Input/Input";
import Select from "../Select/Select";
import FileInput from "../FileInput/FileInput";
import { Camera, Shield } from "react-feather";
import InputWrapper from "../InputWrapper/InputWrapper";
import { playerSchema } from "@/schemas/player.schema";
import { useEffect } from "react";
import Paragraph from "../Paragraph/Paragraph";
import { addPlayer } from "@/services/players/players";
import { useMutation, useQueryClient } from "react-query";
import { showNotification } from "@/utils/showNotification";

const AddPlayerForm = ({ teamId }: { teamId: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(playerSchema) });

  const queryClient = useQueryClient();

  const handleFormSuccess = () => {
    reset();
    queryClient.invalidateQueries("get-players");
    showNotification("Player added correctly", 2000, "success");
  };

  const { mutate, isLoading, isSuccess, isError } = useMutation(addPlayer, {
    onSuccess: handleFormSuccess,
    onError: () => console.log("error"),
  });

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("photo", data.photo[0]);
    formData.append("number", data.number);
    formData.append("team", teamId);
    mutate(formData);
  };

  const hasErrors = Object.keys(errors).length > 0;
  const firstError = Object.keys(errors)[0];

  useEffect(() => {
    console.log(errors);
  }, [errors]);

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
            register={register("photo")}
          />
          <section className="flex w-16 gap-1 items-center">
            #
            <Input errors={errors} type="text" {...register(`number`)} />
          </section>
        </section>

        <InputWrapper label="Name">
          <Input errors={errors} type="text" {...register(`name`)} />
        </InputWrapper>
        {hasErrors && (
          <Paragraph color="text-red-600">
            {errors[firstError]?.message as string}
          </Paragraph>
        )}
        <Button type="submit">Add Player</Button>
      </form>
    </CardWrapper>
  );
};

export default AddPlayerForm;
