import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

type User = {
  username: string;
  team?: string;
};
type State = {
  token: string | null;
  user: User | null;
};

type Action = {
  updateToken: (token: string) => void;
};

export const useSession = create<State & Action>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      updateToken: (token: string) => {
        set({ token });
      },
    }),
    { name: "user-session" }
  )
);
