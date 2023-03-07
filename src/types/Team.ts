export interface Team {
  id: string;
  name: string;
  color: string;
  goalsFor: number;
  goalsAgainst: number;
  ties: number;
  loses: number;
  games: number;
  wins: number;
  goalDifference: number;
  points: number;
  lastFiveGames: PossibleResults[];
}

export type PossibleResults = "WIN" | "LOSS" | "TIE";
