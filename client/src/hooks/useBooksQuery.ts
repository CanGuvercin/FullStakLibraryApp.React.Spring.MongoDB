import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../api/bookApi";

export function useBooksQuery(query: string) {
  return useQuery({
    queryKey: ["books", query],
    queryFn: () => bookApi.getAll(),
  });
}
