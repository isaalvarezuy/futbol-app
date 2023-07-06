import { User } from "@/types/User";
import { create } from "zustand";

type State = {
  user: User | null;
};

type Action = {
  updateUser: (user: User) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  user: null,
  updateUser: (user: User) => {
    set({ user });
  },
}));
