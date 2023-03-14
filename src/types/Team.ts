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
  gameHistory: GameHistory[];
}

export type PossibleResults = "WIN" | "LOSS" | "TIE";
export interface GameHistory {
  result: string;
  against: string;
  goalsScored: number;
  goalsReceived: number;
}
