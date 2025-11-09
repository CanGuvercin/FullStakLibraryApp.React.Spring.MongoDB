import { useMutation, useQueryClient } from "@tanstack/react-query";
import { holdsApi } from "../api/holdsApi";

export function useCreateHoldMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookId: string) => holdsApi.createHold(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myHolds"] });
    },
  });
}
