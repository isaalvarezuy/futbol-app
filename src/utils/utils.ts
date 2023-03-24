import { SelectOption } from "@/types/components/SelectOption";
import { Player } from "@/types/responses/Player";
import { BaseObject } from "@/types/utils/BaseObject";

export const getTeamPlayers = (players: Player[], teamId: string) => {
  return players?.filter((player) => player.team === teamId) || [];
};

export const transformToSelectOption = (array: BaseObject[]) => {
  const selectOptions: SelectOption[] = array.map((item) => {
    return { value: `${item.id}`, label: item.name };
  });
  return selectOptions;
};
