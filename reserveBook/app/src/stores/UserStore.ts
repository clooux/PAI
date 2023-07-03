import { create } from "zustand";
import { User } from "../models/User";

type State = {
  firstName: string;
  lastName: string;
  email: string;
  id: number | undefined;
};

type Actions = {
  setUser: (user: User) => void;
  reset: () => void;
};

const initialState: State = {
  firstName: "",
  lastName: "",
  email: "",
  id: undefined,
};

export const useUserStore = create<State & Actions>()((set) => ({
  ...initialState,
  setUser: (user: User) => {
    set({ ...user });
  },
  reset: () => {
    set(initialState);
  },
}));
