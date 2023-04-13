import { teamsAdapter } from "@/adapters/responses/teams.adapter";
import { axiosGet, axiosPost } from "@/services/axios";

export const getTeams = async () => {
  const response = await axiosGet("teams");
  return teamsAdapter(response.data);
};
export const addTeam = async (body: FormData) => {
  const response = await axiosPost("add-team", body);
  return response;
};
