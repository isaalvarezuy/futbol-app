import { Player } from "@/types/responses/Player";

export const playersAdapter = (players: any) => {
  const adaptedPlayers: Player[] = players.map((p: any) => {
    const player: Player = {
      name: `${p.nombre} ${p.apellido}`,
      number: p.numero,
      goals: p.goles,
      id: p._id,
      team: p.idEquipo,
    };
    return player;
  });
  const sortedPlayers = adaptedPlayers.sort((a, b) => b.goals - a.goals);

  return sortedPlayers;
};
