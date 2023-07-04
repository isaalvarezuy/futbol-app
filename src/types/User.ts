import { Team } from "./Team";

export interface User {
  id: string;
  username: string;
  team?: Team;
}
