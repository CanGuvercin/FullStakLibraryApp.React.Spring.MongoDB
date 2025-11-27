import { create } from "zustand";

type Role = "ADMIN" | "MEMBER" | null;

interface AuthState {
  token: string | null;
  user: any | null;
  role: Role;
  isAuthenticated: boolean;
  login: (token: string, user: any, role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,
  role: null,
  isAuthenticated: !!localStorage.getItem("token"),

  login: (token, user, role) => {
    localStorage.setItem("token", token);
    set({
      token,
      user,
      role,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      user: null,
      role: null,
      isAuthenticated: false,
    });
  },
}));
