import client from "./client";

export const loansApi = {
  getMyLoans: () =>
    client.get("/api/loans/me").then((res) => res.data),

  createLoan: (copyId: string) =>
    client.post("/api/loans", { copyId }).then((res) => res.data),

  returnLoan: (id: string) =>
    client.post(`/api/loans/${id}/return`).then((res) => res.data),
};

