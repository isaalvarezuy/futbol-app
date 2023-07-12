import { Game } from "../models/Game";
import { Player } from "./Player";

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
  gameHistory: Game[];
  players: Player[];
  __v: number;
}

/* 
{
  "_id": "649c7cea4f7de4ac04f63d4d",
  "name": "OL Reign",
  "imgUrl": "http://res.cloudinary.com/isita/image/upload/v1687977194/football-app/1687977192971.png",
  "goalsFor": 0,
  "goalsAgainst": 1,
  "ties": 0,
  "loses": 1,
  "games": 0,
  "wins": 0,
  "gameHistory": [
      {
          "opponent": {
              "_id": "649c7f954f7de4ac04f63e01",
              "name": "NY Gotham"
          },
          "goalsFor": 0,
          "goalsAgainst": 1,
          "result": "LOSS",
          "_id": "64a97357cc1127a30127a45e"
      }
  ],
  "players": [],
  "__v": 1
}, */
