import { create } from "zustand";

function isValidToken(token: string | null): boolean {
  if (!token) return false;

  // JWT format kontrolü
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    // Token içindeki exp kontrolü
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      return false; // token expired
    }

    return true;
  } catch {
    return false;
  }
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  let token = localStorage.getItem("token");

  // Sayfa yüklenirken token kontrolü yap
  const valid = isValidToken(token);

  if (!valid) {
    localStorage.removeItem("token");
    token = null;
  }

  return {
    token,
    isAuthenticated: valid,

    login: (newToken) => {
      localStorage.setItem("token", newToken);
      set({
        token: newToken,
        isAuthenticated: true,
      });
    },

    logout: () => {
      localStorage.removeItem("token");
      set({
        token: null,
        isAuthenticated: false,
      });
    },
  };
});
