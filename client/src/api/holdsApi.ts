import client from "./client";

export const holdsApi = {
  getMyHolds: () => client.get("/holds/me").then(res => res.data),
  createHold: (bookId: string) => client.post("/holds", { bookId }).then(res => res.data),
  cancelHold: (id: string) => client.post(`/holds/${id}/cancel`).then(res => res.data),
};
