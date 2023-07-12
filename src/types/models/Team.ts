import { Game } from "./Game";
import { Player } from "../responses/Player";

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
  gameHistory: Game[];
  players: Player[];
}
