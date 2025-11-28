import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loansApi } from "../api/loansApi";

export function useReturnLoanMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => loansApi.returnLoan(id),
    onSuccess: () => {
      // Invalidate all relevant queries
      queryClient.invalidateQueries({ queryKey: ["myLoans"] });
      queryClient.invalidateQueries({ queryKey: ["book"] }); // All book details
      queryClient.invalidateQueries({ queryKey: ["books"] }); // Books list
    },
  });
}
