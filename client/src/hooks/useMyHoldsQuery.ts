import { useQuery } from "@tanstack/react-query";
import { holdsApi } from "../api/holdsApi";

export function useMyHoldsQuery() {
  return useQuery({
    queryKey: ["myHolds"],
    queryFn: holdsApi.getMyHolds,
  });
}
