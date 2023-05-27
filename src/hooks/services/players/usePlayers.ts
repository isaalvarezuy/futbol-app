import { playersAdapter } from "@/adapters/responses/players.adapter";
import { useAxios } from "../useAxios";

export const usePlayers = () => {
  const { client } = useAxios();
  const getPlayers = async () => {
    const response = await client.get("/players");
    return playersAdapter(response.data);
  };

  const addPlayer = async (body: FormData) => {
    const response = await client.post("/players", body);

    return response;
  };

  const deletePlayer = async (id: string) => {
    const response = await client.delete(`/players/${id}`);
    return response;
  };

  return { getPlayers, addPlayer, deletePlayer };
};
