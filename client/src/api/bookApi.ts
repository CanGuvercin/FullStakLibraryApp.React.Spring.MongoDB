// get book

// get by book id

import client from "./client";

export const bookApi = {
  getAll: () => client.get("/books").then(res => res.data),
  getById: (id: string) => client.get(`/books/${id}`).then(res => res.data),
};
