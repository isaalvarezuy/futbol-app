import { Team } from "@/types/Team";
import { SelectOption } from "@/types/components/SelectOption";
import { Player } from "@/types/responses/Player";
import { BaseObject } from "@/types/utils/BaseObject";

export const getTeamPlayers = (teamId: string, teams: Team[]) => {
  const selectedTeam = teams.filter((team) => team.id === teamId);
  if (selectedTeam[0]) return selectedTeam[0].players;
  return [];
};

export const transformToSelectOption = (array: BaseObject[]) => {
  const selectOptions: SelectOption[] = array.map((item) => {
    return { value: `${item.id}`, label: item.name };
  });
  return selectOptions;
};
