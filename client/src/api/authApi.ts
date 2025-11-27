import client from "./client";

export type LoginResponse = { token: string };

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const res = await client.post("/api/auth/login", { email, password });

    const data = res.data;

    // Backend şu an direk string JWT dönüyor:
    // eyJhbGciOiJIUzI1NiJ9...
    if (typeof data === "string") {
      return { token: data };
    }

    // İleride JSON'a çevirirsen, burası da çalışır:
    if (data && typeof data.token === "string") {
      return { token: data.token };
    }

    throw new Error("Unexpected login response format");
  },
  register: async (email: string, password: string, fullName: string): Promise<LoginResponse> => {
  const res = await client.post("/api/auth/register", {
    email,
    password,
    fullName
  });

  const data = res.data;

  // Backend sadece token string döndürüyorsa
  if (typeof data === "string") {
    return { token: data };
  }

  // İleride backend JSON döndürürse destekliyor:
  if (data && typeof data.token === "string") {
    return { token: data.token };
  }

  throw new Error("Unexpected register response format");
}

};
