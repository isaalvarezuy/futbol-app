import {
  TeamFromResponse,
  PossibleResultsFromResponse,
} from "@/types/responses/Team";
import { Team, PossibleResults } from "@/types/Team";

export const teamsAdapter = (teams: any) => {
  const adaptedTeams = teams.map((t: any) => {
    const gameLabelMapper = {
      p: "LOSS",
      e: "TIE",
      g: "WIN",
    };

    const lastFiveGames = t.gameHistory.slice(-5);
    const lastFiveGamesMapped = lastFiveGames.map(
      (result: PossibleResultsFromResponse) => gameLabelMapper[result]
    );

    const adaptedTeam: Team = {
      id: t._id,
      name: t.name,
      crest: t.imgUrl,
      goalsFor: t.goalsFor,
      goalsAgainst: t.goalsAgainst,
      ties: t.ties,
      loses: t.loses,
      games: t.games,
      wins: t.wins,
      goalDifference: t.goalsFor - t.goalsAgainst,
      points: t.games * 3 + t.ties,
      lastFiveGames: lastFiveGamesMapped as PossibleResults[],
      gameHistory: t.gameHistory,
      players: t.players.map(({ _id, ...p }: any) => {
        return { ...p, id: _id };
      }),
    };
    return adaptedTeam;
  });

  const sortedTeams = adaptedTeams.sort((a, b) => b.points - a.points);

  return sortedTeams;
};
