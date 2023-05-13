import { playersAdapter } from "@/adapters/responses/players.adapter";
import { client } from "../axios";

export const getPlayers = async () => {
  const response = await client.get("/players");
  return playersAdapter(response.data);
};

export const addPlayer = async (body: FormData) => {
  const response = await client.post("/players", body);

  return response;
};

export const deletePlayer = async (id: string) => {
  const response = await client.delete(`/players/${id}`);
  return response;
};
