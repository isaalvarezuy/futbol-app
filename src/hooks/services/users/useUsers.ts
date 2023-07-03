import { userAdapter } from "@/adapters/responses/user.adapter";
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

  const getUser = async (id: string) => {
    const response = await authenticatedAxios.get(`/users/${id}`);
    return userAdapter(response.data);
  };

  return { addUserTeam, getUser };
};
