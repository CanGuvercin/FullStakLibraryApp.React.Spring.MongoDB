import { useQuery } from "@tanstack/react-query";
import { loansApi } from "../api/loansApi";

export function useMyLoansQuery() {
  return useQuery({
    queryKey: ["myLoans"],
    queryFn: loansApi.getMyLoans,
  });
}
