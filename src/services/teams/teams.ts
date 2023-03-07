import { teamsAdapter } from "@/adapters/responses/teams.adapter";
import { axiosGet } from "@/services/axios";

export const getTeams = async () => {
  const response = await axiosGet("listarEquipos");
  return teamsAdapter(response.data);
};
