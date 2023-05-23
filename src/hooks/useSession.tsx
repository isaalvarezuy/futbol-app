import { create } from "zustand";

type State = {
  token: string | null;
};

type Action = {
  updateToken: (token: string) => void;
};

export const useSession = create<State & Action>((set) => ({
  token: null,
  updateToken: (token: string) => {
    set({ token });
  },
}));
