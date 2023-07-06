import { teamAdapter } from "@/adapters/responses/team.adapter";
import { teamsAdapter } from "@/adapters/responses/teams.adapter";
import { useSession } from "@/hooks/store/useSession";

import { Team } from "@/types/Team";
import { useAxios } from "../useAxios";

export const useTeams = () => {
  const { authenticatedAxios } = useAxios();
  const token = useSession((store) => store.token);

  const getTeams = async (): Promise<Team[]> => {
    const response = await authenticatedAxios.get("/teams");
    return teamsAdapter(response.data);
  };
  const getTeam = async (id: string) => {
    const response = await authenticatedAxios.get(`/teams/${id}`);
    return teamAdapter(response.data);
  };
  const addTeam = async (body: FormData) => {
    const response = await authenticatedAxios.post("/teams", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };
  const deleteTeam = async (id: string) => {
    const response = await authenticatedAxios.delete(`/teams/${id}`);
    return response;
  };

  return { getTeam, getTeams, addTeam, deleteTeam };
};
