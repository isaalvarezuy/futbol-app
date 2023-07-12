import { TeamFromResponse } from "@/types/responses/Team";
import { Team } from "@/types/models/Team";

export const teamsAdapter = (teams: TeamFromResponse[]) => {
  const adaptedTeams = teams.map((t: TeamFromResponse) => {
    const adaptedTeam: Team = {
      id: t._id,
      name: t.name,
      crest: t.imgUrl,
      goalsFor: t.goalsFor,
      goalsAgainst: t.goalsAgainst,
      ties: t.ties,
      loses: t.loses,
      games: t.wins + t.ties + t.loses,
      wins: t.wins,
      goalDifference: t.goalsFor - t.goalsAgainst,
      points: t.wins * 3 + t.ties,
      gameHistory: t.gameHistory,
      players: t.players,
    };
    return adaptedTeam;
  });

  const sortedTeams = adaptedTeams.sort((a, b) => b.points - a.points);

  return sortedTeams;
};
