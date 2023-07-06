import FormWrapper from "../FormWrapper/FormWrapper";
import Paragraph from "../Paragraph/Paragraph";
import { userTeamSchema } from "@/schemas/userTeam.schema";
import Button from "../Button/Button";
import Select from "../SelectNew/Select";
import { useStore } from "@/hooks/store/useStore";
import { useMutation, useQueryClient } from "react-query";
import { useUsers } from "@/hooks/services/users/useUsers";
import { useSession } from "@/hooks/store/useSession";
import FileInputNew from "../FileInput/FileInput";
import FieldWrapper from "../FieldWrapper/FieldWrapper";
import Input from "../Input/Input";
import { Shield } from "react-feather";
import CardWrapper from "../CardWrapper/CardWrapper";
import { useTeams } from "@/hooks/services/teams/useTeams";

const UserTeamForm = () => {
  const teams = useStore((store) => store.teams);
  const { addUserTeam } = useUsers();
  const { addTeam } = useTeams();

  const user = useSession((store) => store.user);

  const teamOptions = teams.map((team) => ({
    label: team.name,
    value: team.id,
  }));
  const selectOptions = [
    ...teamOptions,
    { value: "create", label: "Create new team" },
  ];
  const queryClient = useQueryClient();

  const updateUserTeam = (teamId: string) => {
    console.log(teamId);
    const requestBody = {
      username: user!.username,
      teamId,
    };
    updateTeam(requestBody);
  };

  const { mutate: updateTeam, isLoading: isLoadingUpdate } = useMutation(
    addUserTeam,
    {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["get-user"] }),
    }
  );
  const { mutate: createTeam, isLoading: isLoadingCreate } = useMutation(
    addTeam,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("get-teams");
        updateUserTeam(data.data._id);
      },
    }
  );

  const createNewTeam = (data: any) => {
    const formData = new FormData();
    formData.append("crest", data.crest[0]);
    formData.append("name", data.name);
    createTeam(formData);
  };

  return (
    <FormWrapper
      onSubmit={(data) =>
        data.team === "create" ? createNewTeam(data) : updateUserTeam(data.team)
      }
      schema={userTeamSchema}
    >
      {({ register, errors, watch }) => {
        const team = watch("team");
        const showAddTeamForm = team === "create";
        const hasErrors = Object.keys(errors).length > 0;
        const firstError = Object.keys(errors)[0];
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
            {showAddTeamForm && (
              <CardWrapper>
                <FileInputNew
                  label="Crest"
                  Placeholder={Shield}
                  {...register("crest")}
                  error={errors["crest"]}
                />
                <FieldWrapper label="Team Name">
                  <Input errors={errors} type="text" {...register(`name`)} />
                </FieldWrapper>
                {hasErrors && (
                  <Paragraph color="text-red-600">
                    {errors[firstError]?.message as string}
                  </Paragraph>
                )}
              </CardWrapper>
            )}
            <Button
              variant="primary"
              type="submit"
              loading={isLoadingUpdate || isLoadingCreate}
            >
              Save
            </Button>
          </>
        );
      }}
    </FormWrapper>
  );
};

export default UserTeamForm;
