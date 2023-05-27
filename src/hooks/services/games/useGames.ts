import { useAxios } from "../useAxios";

export const useGames = () => {
  const { client } = useAxios();
  const addGame = async (body: any) => {
    const response = await client.post("/games", body);
    return response;
  };

  return { addGame };
};
