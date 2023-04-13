export interface TeamFromResponse {
  _id: string;
  name: string;
  imgUrl: string;
  goalsFor: number;
  goalsAgainst: number;
  ties: number;
  loses: number;
  games: number;
  wins: number;
  goalDifference: number;
  points: number;
  lastFiveGames: any[];
  gameHistory: any[];
  __v: number;
}

export type PossibleResultsFromResponse = "p" | "g" | "e";
