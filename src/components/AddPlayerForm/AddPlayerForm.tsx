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

const AddPlayerForm = ({ teams }: { teams: Team[] }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(playerSchema) });
  const onSubmit = (data: any) => {
    console.log("hola");
    console.log(data);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  const teamOptions = teams.map(({ id, name }) => {
    return { value: id, label: name };
  });
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
        <InputWrapper label="First Name">
          <Input errors={errors} type="text" {...register(`firstName`)} />
        </InputWrapper>
        <InputWrapper label="Last Name">
          <Input errors={errors} type="text" {...register(`lastName`)} />
        </InputWrapper>

        <Button type="submit">Add Player</Button>
      </form>
    </CardWrapper>
  );
};

export default AddPlayerForm;
