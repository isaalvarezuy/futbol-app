import { User } from "@/types/User";
import { teamAdapter } from "./team.adapter";

export const userAdapter = (u: any) => {
  const adaptedTeam: User = {
    id: u._id,
    username: u.username,
    team: u.team && teamAdapter(u.team),
  };

  return adaptedTeam;
};
