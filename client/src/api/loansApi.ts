// src/api/loansApi.ts
import client from "./client";

export const loansApi = {
  getMyLoans: () => client.get("/loans/me").then(res => res.data),
  createLoan: (copyId: string) => client.post("/loans", { copyId }).then(res => res.data),
  returnLoan: (id: string) => client.post(`/loans/${id}/return`).then(res => res.data),
};
