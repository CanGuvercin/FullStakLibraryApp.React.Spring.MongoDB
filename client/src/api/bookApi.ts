// get book

// get by book id

import client from "./client";

export const bookApi = {
  getAll: () => client.get("/api/books").then(res => res.data),
  getById: (id: string) => client.get(`/api/books/${id}`).then(res => res.data),
};
