import { playersAdapter } from "@/adapters/responses/players.adapter";
import { axiosGet } from "../axios";

export const getPlayers = async () => {
  const response = await axiosGet("listarJugadores");
  return playersAdapter(response.data);
};
