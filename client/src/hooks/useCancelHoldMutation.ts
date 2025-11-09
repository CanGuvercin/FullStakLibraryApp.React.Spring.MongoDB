import { useMutation, useQueryClient } from "@tanstack/react-query";
import { holdsApi } from "../api/holdsApi";

export function useCancelHoldMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => holdsApi.cancelHold(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myHolds"] });
    },
  });
}
