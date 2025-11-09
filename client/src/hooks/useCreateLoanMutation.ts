import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loansApi } from "../api/loansApi";

export function useCreateLoanMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (copyId: string) => loansApi.createLoan(copyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myLoans"] });
    },
  });
}
