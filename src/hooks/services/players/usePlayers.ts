import { playersAdapter } from "@/adapters/responses/players.adapter";
import { useAxios } from "../useAxios";

export const usePlayers = () => {
  const { authenticatedAxios } = useAxios();
  const getPlayers = async () => {
    const response = await authenticatedAxios.get("/players");
    return playersAdapter(response.data);
  };

  const addPlayer = async (body: FormData) => {
    const response = await authenticatedAxios.post("/players", body);

    return response;
  };

  const deletePlayer = async (id: string) => {
    const response = await authenticatedAxios.delete(`/players/${id}`);
    return response;
  };

  return { getPlayers, addPlayer, deletePlayer };
};
