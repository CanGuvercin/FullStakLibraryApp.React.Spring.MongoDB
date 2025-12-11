import { create } from "zustand";

/* ----------------------------- Token Validation ----------------------------- */

function isValidToken(token: string | null): boolean {
  if (!token) return false;

  // JWT format check (header.payload.signature)
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    // Decode payload
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);

    // Expired token?
    if (payload.exp && payload.exp < now) return false;

    return true;
  } catch {
    return false;
  }
}

/* ----------------------------- Decode JWT Payload ---------------------------- */

type AuthUser = {
  id: string;
  email: string;
  role: string; // "ADMIN" | "MEMBER"
};

function decodeToken(token: string): AuthUser | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      id: payload.id,
      email: payload.sub,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

/* -------------------------------- Auth Store -------------------------------- */

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;

  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Load token from localStorage at startup
  let token = localStorage.getItem("token");
  const valid = isValidToken(token);

  let user: AuthUser | null = null;

  if (valid && token) {
    user = decodeToken(token);
  } else {
    token = null;
    localStorage.removeItem("token");
  }

  return {
    token,
    user,
    isAuthenticated: valid,

    /* ----------------------------- LOGIN FUNCTION ---------------------------- */
    login: (newToken: string) => {
      const decoded = decodeToken(newToken);

      localStorage.setItem("token", newToken);

      set({
        token: newToken,
        user: decoded,
        isAuthenticated: true,
      });
    },

    /* ---------------------------- LOGOUT FUNCTION ---------------------------- */
    logout: () => {
      localStorage.removeItem("token");

      set({
        token: null,
        user: null,
        isAuthenticated: false,
      });
    },
  };
});
