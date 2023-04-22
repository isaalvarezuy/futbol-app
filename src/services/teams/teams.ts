import { teamsAdapter } from "@/adapters/responses/teams.adapter";
import { axiosGet, axiosPost, client } from "@/services/axios";

export const getTeams = async () => {
  const response = await client.get("/teams");
  return teamsAdapter(response.data);
};
export const addTeam = async (body: FormData) => {
  const response = await client.post("/teams", body);
  return response;
};
export const deleteTeam = async (id: string) => {
  const response = await client.delete(`/teams/${id}`);
  return response;
};
