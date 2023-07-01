import { persist } from "zustand/middleware";
import { create } from "zustand";

type User = {
  username: string;
  id: string;
  teamId?: string;
};
type State = {
  token: string | null;
  user: User | null;
};

type Action = {
  updateToken: (token: string) => void;
  updateUser: (id: string, username: string, teamId: string) => void;
};

export const useSession = create<State & Action>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      updateToken: (token: string) => {
        set({ token });
      },
      updateUser: (id: string, username: string, teamId: string) => {
        set({ user: { id, username, teamId } });
      },
    }),
    { name: "user-session" }
  )
);
