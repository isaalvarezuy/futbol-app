import {
  TeamFromResponse,
  PossibleResultsFromResponse,
} from "@/types/responses/Team";
import { Team, PossibleResults } from "@/types/Team";

export const teamsAdapter = (teams: TeamFromResponse[]) => {
  const adaptedTeams = teams.map((t: TeamFromResponse) => {
    const gameLabelMapper = {
      p: "LOSS",
      e: "TIE",
      g: "WIN",
    };

    const lastFiveGames = t.historico.slice(-5);
    const lastFiveGamesMapped = lastFiveGames.map(
      (result: PossibleResultsFromResponse) => gameLabelMapper[result]
    );

    const gameResults = t.historico.map(
      (result: PossibleResultsFromResponse) => gameLabelMapper[result]
    );

    const gameHistory = gameResults.map((result, idx) => {
      return {
        result: result,
        against: t.vs[idx],
        goalsScored: t.hisGF[idx],
        goalsReceived: t.hisGC[idx],
      };
    });
    const adaptedTeam: Team = {
      id: t._id,
      name: t.nombre,
      color: t.color,
      goalsFor: t.gf,
      goalsAgainst: t.gc,
      ties: t.pe,
      loses: t.pp,
      games: t.pj,
      wins: t.pg,
      goalDifference: t.gf - t.gc,
      points: t.pg * 3 + t.pe,
      lastFiveGames: lastFiveGamesMapped as PossibleResults[],
      gameHistory,
    };
    return adaptedTeam;
  });

  const sortedTeams = adaptedTeams.sort((a, b) => b.points - a.points);

  return sortedTeams;
};
