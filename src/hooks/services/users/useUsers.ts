import { useAxios } from "../useAxios";

export const useUsers = () => {
  const { authenticatedAxios } = useAxios();
  const addUserTeam = async (body: { username: string; teamId: string }) => {
    const { username, teamId } = body;
    const response = await authenticatedAxios.put(`users/${username}`, {
      teamId,
    });
    return response;
  };

  return { addUserTeam };
};
