import { useMutation, useQueryClient } from "@tanstack/react-query";
import { holdsApi } from "../api/holdsApi";

export function useCreateHoldMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookId: string) => holdsApi.createHold(bookId),
    onSuccess: () => {
      // Invalidate all relevant queries
      queryClient.invalidateQueries({ queryKey: ["myHolds"] });
      queryClient.invalidateQueries({ queryKey: ["book"] }); // All book details
      queryClient.invalidateQueries({ queryKey: ["books"] }); // Books list
    },
  });
}
