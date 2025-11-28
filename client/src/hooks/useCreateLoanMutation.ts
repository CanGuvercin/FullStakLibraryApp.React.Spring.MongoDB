import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loansApi } from "../api/loansApi";

export function useCreateLoanMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (copyId: string) => loansApi.createLoan(copyId),
    onSuccess: () => {
      // Invalidate all relevant queries
      queryClient.invalidateQueries({ queryKey: ["myLoans"] });
      queryClient.invalidateQueries({ queryKey: ["book"] }); // All book details
      queryClient.invalidateQueries({ queryKey: ["books"] }); // Books list
    },
  });
}
