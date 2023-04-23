import { playersAdapter } from "@/adapters/responses/players.adapter";
import { client } from "../axios";

export const getPlayers = async () => {
  const response = await client.get("/players");
  return playersAdapter(response.data);
};

export const addPlayer = async (body: FormData) => {
  const response = await client.post("/players", body);
  console.log(response);
  return response;
};
