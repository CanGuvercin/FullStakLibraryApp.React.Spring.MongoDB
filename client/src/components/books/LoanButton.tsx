import { useCreateLoanMutation } from "../../hooks/useCreateLoanMutation";
import { useReturnLoanMutation } from "../../hooks/useReturnLoanMutation";
import { useCreateHoldMutation } from "../../hooks/useCreateHoldMutation";
import { useCancelHoldMutation } from "../../hooks/useCancelHoldMutation";


type LoanButtonProps = {
  availableCopyId?: string | null;
  userHasLoan?: boolean;
  userHasHold?: boolean;
  currentHoldId?: string | null;
};

export default function LoanButton({
  availableCopyId,
  userHasLoan,
  userHasHold,
  currentHoldId,
}: LoanButtonProps) {
  const createLoan = useCreateLoanMutation();
  const returnLoan = useReturnLoanMutation();
  const createHold = useCreateHoldMutation();
  const cancelHold = useCancelHoldMutation();

  if (userHasLoan) {
    return (
      <button
        onClick={() => returnLoan.mutate(currentHoldId!)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Return book
      </button>
    );
  }

  if (availableCopyId) {
    return (
      <button
        onClick={() => createLoan.mutate(availableCopyId)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Loan now
      </button>
    );
  }

  if (userHasHold) {
    return (
      <button
        onClick={() => cancelHold.mutate(currentHoldId!)}
        className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
      >
        Cancel hold
      </button>
    );
  }

  return (
    <button
      onClick={() => createHold.mutate(currentHoldId!)}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Place hold
    </button>
  );
}
