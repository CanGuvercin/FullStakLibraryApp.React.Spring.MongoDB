import client from "./client";

export const authApi = {
  login: async (email: string, password: string) => {
    const res = await client.post("/api/auth/login", { email, password });
    return res.data; // { accessToken, role, user }
  },

  register: async (payload: {
    email: string;
    password: string;
    fullName: string;
  }) => {
    const res = await client.post("/api/auth/register", payload);
    return res.data;
  },
};
