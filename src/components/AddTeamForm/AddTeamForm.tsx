import Button from "../Button/Button";
import CardWrapper from "../CardWrapper/CardWrapper";
import Input from "../Input/Input";
import { Shield } from "react-feather";
import FieldWrapper from "../FieldWrapper/FieldWrapper";
import { useMutation, useQueryClient } from "react-query";
import { showNotification } from "@/utils/showNotification";
import { teamSchema } from "@/schemas/team.schema";
import Paragraph from "../Paragraph/Paragraph";
import { useTeams } from "@/hooks/services/teams/useTeams";
import FileInputNew from "../FileInput/FileInput";
import FormWrapper from "../FormWrapper/FormWrapper";

const AddTeamForm = () => {
  const { addTeam } = useTeams();
  const handleFormSuccess = () => {
    queryClient.invalidateQueries("get-teams");
    showNotification("Team added correctly", 2000, "success");
  };
  const { mutate, isLoading, isSuccess } = useMutation(addTeam, {
    onSuccess: handleFormSuccess,
  });
  const queryClient = useQueryClient();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("crest", data.crest[0]);
    formData.append("name", data.name);
    mutate(formData);
  };

  return (
    <CardWrapper title="Add Team">
      <FormWrapper
        schema={teamSchema}
        onSubmit={onSubmit}
        isSuccess={isSuccess}
      >
        {({ register, errors }) => {
          const hasErrors = Object.keys(errors).length > 0;
          const firstError = Object.keys(errors)[0];
          return (
            <>
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
              <Button variant="primary" type="submit" loading={isLoading}>
                Add team
              </Button>
            </>
          );
        }}
      </FormWrapper>
    </CardWrapper>
  );
};

export default AddTeamForm;
