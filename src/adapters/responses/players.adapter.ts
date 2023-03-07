import { Player } from "@/types/responses/Player";

export const playersAdapter = (players: any) => {
  const adaptedPlayers: Player[] = players.map((p: any) => {
    const player: Player = {
      fullName: `${p.nombre} ${p.apellido}`,
      number: p.numero,
      goals: p.goles,
      id: p._id,
    };
    return player;
  });
  const sortedPlayers = adaptedPlayers.sort((a, b) => b.goals - a.goals);
  const top5GoalScorers = sortedPlayers.slice(0, 5);
  return top5GoalScorers;
};
