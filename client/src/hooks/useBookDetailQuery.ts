import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../api/bookApi";

export function useBookDetailQuery(id: string) {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => bookApi.getById(id),
  });
}
