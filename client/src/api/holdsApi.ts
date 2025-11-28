import client from "./client";

export const holdsApi = {
  getMyHolds: () =>
    client.get("/api/holds/me").then((res) => res.data),

  createHold: (bookId: string) =>
    client.post("/api/holds", { bookId }).then((res) => res.data),

  cancelHold: (id: string) =>
    client.post(`/api/holds/${id}/cancel`).then((res) => res.data),
};
