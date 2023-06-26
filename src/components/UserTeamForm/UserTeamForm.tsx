import React from "react";
import FormWrapper from "../FormWrapper/FormWrapper";
import Paragraph from "../Paragraph/Paragraph";
import { userTeamSchema } from "@/schemas/userTeam.schema";
import Button from "../Button/Button";
import Select from "../SelectNew/Select";
import { useStore } from "@/hooks/useStore";
import AddTeamForm from "../AddTeamForm/AddTeamForm";
const UserTeamForm = () => {
  const teams = useStore((store) => store.teams);
  const teamOptions = teams.map((team) => ({
    label: team.name,
    value: team.id,
  }));
  const selectOptions = [
    ...teamOptions,
    { value: "create", label: "Create new team" },
  ];
  return (
    <FormWrapper onSubmit={(data) => console.log(data)} schema={userTeamSchema}>
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
