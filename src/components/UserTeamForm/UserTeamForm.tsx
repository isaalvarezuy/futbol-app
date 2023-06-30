import React from "react";
import FormWrapper from "../FormWrapper/FormWrapper";
import Paragraph from "../Paragraph/Paragraph";
import { userTeamSchema } from "@/schemas/userTeam.schema";
import Button from "../Button/Button";
import Select from "../SelectNew/Select";
import { useStore } from "@/hooks/useStore";
import AddTeamForm from "../AddTeamForm/AddTeamForm";
import { useMutation } from "react-query";
import { useUsers } from "@/hooks/services/users/useUsers";
import { useSession } from "@/hooks/useSession";

const UserTeamForm = () => {
  const teams = useStore((store) => store.teams);
  const { addUserTeam } = useUsers();

  const user = useSession((store) => store.user);

  const teamOptions = teams.map((team) => ({
    label: team.name,
    value: team.id,
  }));
  const selectOptions = [
    ...teamOptions,
    { value: "create", label: "Create new team" },
  ];

  const { mutate, isLoading } = useMutation(addUserTeam, {
    onSuccess: () => console.log("success"),
  });

  return (
    <FormWrapper
      onSubmit={(data) => {
        console.log(data);

        const requestBody = {
          username: user!.username,
          teamId: data.team,
        };
        mutate(requestBody);
      }}
      schema={userTeamSchema}
    >
      {({ register, errors, watch }) => {
        const team = watch("team");
        const showAddTeamForm = team === "create";
        return (
          <>
            <Paragraph size={20} weight="semibold">
              Select a team
            </Paragraph>

            <Select
              options={selectOptions}
              error={errors["team"]}
              {...register("team")}
            />
            {showAddTeamForm ? (
              <AddTeamForm />
            ) : (
              <Button type="submit">Save</Button>
            )}
          </>
        );
      }}
    </FormWrapper>
  );
};

export default UserTeamForm;
