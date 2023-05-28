import { useAxios } from "../useAxios";

export const useGames = () => {
  const { authenticatedAxios } = useAxios();
  const addGame = async (body: any) => {
    const response = await authenticatedAxios.post("/games", body);
    return response;
  };

  return { addGame };
};
