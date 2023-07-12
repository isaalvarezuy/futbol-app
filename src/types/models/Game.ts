import { ObjectValues } from "../ObjectValues";

export type Game = {
  opponent: GameOpponent;
  goalsFor: number;
  goalsAgainst: number;
  result: ObjectValues<typeof GameResults>;
  _id: string;
};

type GameOpponent = {
  _id: string;
  name: string;
};

export const GameResults = {
  WIN: "WIN",
  LOSS: "LOSS",
  TIE: "TIE",
} as const;
