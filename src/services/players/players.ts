import { playersAdapter } from "@/adapters/responses/players.adapter";
import { oldAPIAxiosGet } from "../axios";

export const getPlayers = async () => {
  const response = await oldAPIAxiosGet("listarJugadores");
  return playersAdapter(response.data);
};
