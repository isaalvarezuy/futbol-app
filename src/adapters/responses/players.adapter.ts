import { Player } from "@/types/responses/Player";

export const playersAdapter = (players: any) => {
  const adaptedPlayers: Player[] = players.map((p: any) => {
    const player: Player = {
      name: p.name,
      number: p.number,
      goals: p.goals,
      id: p._id,
      photo: p.imgUrl,
    };
    return player;
  });
  const sortedPlayers = adaptedPlayers.sort((a, b) => b.goals - a.goals);

  return sortedPlayers;
};
