import { Team } from "@/types/Team";
import { playersAdapter } from "./players.adapter";

export const teamAdapter = (t: any) => {
  const adaptedTeam: Team = {
    id: t._id,
    name: t.name,
    crest: t.imgUrl,
    goalsFor: t.goalsFor,
    goalsAgainst: t.goalsAgainst,
    ties: t.ties,
    loses: t.loses,
    games: t.wins + t.loses + t.ties,
    wins: t.wins,
    goalDifference: t.goalsFor - t.goalsAgainst,
    points: t.games * 3 + t.ties,
    lastFiveGames: [],
    gameHistory: t.gameHistory,
    players: t.players ? playersAdapter(t.players) : [],
  };

  return adaptedTeam;
};
