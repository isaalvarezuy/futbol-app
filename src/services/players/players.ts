import { playersAdapter } from "@/adapters/responses/players.adapter";
import { client } from "../axios";

export const getPlayers = async () => {
  const response = await client.get("/players");
  return playersAdapter(response.data);
};
