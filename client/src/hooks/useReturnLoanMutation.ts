import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loansApi } from "../api/loansApi";

export function useReturnLoanMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => loansApi.returnLoan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myLoans"] });
    },
  });
}
