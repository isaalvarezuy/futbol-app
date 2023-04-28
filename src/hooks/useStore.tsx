import { Team } from "@/types/Team";
import { create } from "zustand";

type State = {
  teams: Team[];
};

type Action = {
  updateTeams: (teams: Team[]) => void;
};

export const useStore = create<State & Action>((set) => ({
  teams: [],
  updateTeams: (teams: Team[]) => {
    console.log(teams);
    console.log("entro");
    set({ teams });
  },
}));
