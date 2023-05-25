import { teamAdapter } from "@/adapters/responses/team.adapter";
import { teamsAdapter } from "@/adapters/responses/teams.adapter";
import { useSession } from "@/hooks/useSession";
import { client } from "@/services/axios";
import { Team } from "@/types/Team";

export const useTeams = () => {
  const token = useSession((store) => store.token);

  const getTeams = async (): Promise<Team[]> => {
    console.log("hola");
    const response = await client.get("/teams");
    return teamsAdapter(response.data);
  };
  const getTeam = async (id: string) => {
    const response = await client.get(`/teams/${id}`);
    return teamAdapter(response.data);
  };
  const addTeam = async (body: FormData) => {
    const response = await client.post("/teams", body, {
      headers: {
        Authorization: "Bearer",
      },
    });
    return response;
  };
  const deleteTeam = async (id: string) => {
    const response = await client.delete(`/teams/${id}`);
    return response;
  };

  return { getTeam, getTeams, addTeam, deleteTeam };
};
