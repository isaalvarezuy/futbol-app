import { persist } from "zustand/middleware";
import { create } from "zustand";

type User = {
  username: string;
  teamId?: string;
};
type State = {
  token: string | null;
  user: User | null;
};

type Action = {
  updateToken: (token: string) => void;
  updateUser: (username: string, teamId: string) => void;
};

export const useSession = create<State & Action>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      updateToken: (token: string) => {
        set({ token });
      },
      updateUser: (username: string, teamId: string) => {
        set({ user: { username, teamId } });
      },
    }),
    { name: "user-session" }
  )
);
