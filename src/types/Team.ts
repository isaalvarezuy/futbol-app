import { Player } from "./responses/Player";

export interface Team {
  id: string;
  name: string;
  crest: string;
  goalsFor: number;
  goalsAgainst: number;
  ties: number;
  loses: number;
  games: number;
  wins: number;
  goalDifference: number;
  points: number;
  lastFiveGames: PossibleResults[];
  gameHistory: GameHistory[];
  players: Player[];
}

export type PossibleResults = "WIN" | "LOSS" | "TIE";
export interface GameHistory {
  result: PossibleResults;
  opponent: string;
  goalsFor: number;
  goalsAgainst: number;
}
