import { create } from "zustand";

type AuthState = {
  user: null | { name: string; email: string };
  token: string | null;
  setUser: (user: AuthState["user"]) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: null }),
}));
