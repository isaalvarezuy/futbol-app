import { FormProvider, useForm } from "react-hook-form";
import { Team } from "@/types/Team";
import TeamSection from "./TeamSection";

type TeamType = {
  team: string;
  goals: number;
  goalScorers: {
    player: string;
    goals: string;
  }[];
};

const AddGameForm = ({ teams }: { teams: Team[] }) => {
  const methods = useForm({ defaultValues: { team: teams[1].id, goals: 2 } });

  const { register, handleSubmit } = methods;
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TeamSection teams={teams} />
          <button type="submit">submit</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddGameForm;
