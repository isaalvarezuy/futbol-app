import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

type State = {
  token: string | null;
};

type Action = {
  updateToken: (token: string) => void;
};

export const useSession = create<State & Action>()(
  persist(
    (set) => ({
      token: null,
      updateToken: (token: string) => {
        set({ token });
      },
    }),
    { name: "user-session" }
  )
);
