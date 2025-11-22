import { useCreateLoanMutation } from "../../hooks/useCreateLoanMutation";
import { useReturnLoanMutation } from "../../hooks/useReturnLoanMutation";
import { useCreateHoldMutation } from "../../hooks/useCreateHoldMutation";
import { useCancelHoldMutation } from "../../hooks/useCancelHoldMutation";

type LoanButtonProps = {
  bookId: string; // hold için gerekli
  availableCopyId?: string | null;
  userHasLoan?: boolean;
  userHasHold?: boolean;
  activeLoanId?: string | null;
  activeHoldId?: string | null;
};

export default function LoanButton({
  bookId,
  availableCopyId,
  userHasLoan,
  userHasHold,
  activeLoanId,
  activeHoldId,
}: LoanButtonProps) {
  const createLoan = useCreateLoanMutation();
  const returnLoan = useReturnLoanMutation();
  const createHold = useCreateHoldMutation();
  const cancelHold = useCancelHoldMutation();

  // 1) User already borrowed this book → Return button
  if (userHasLoan && activeLoanId) {
    return (
      <button
        onClick={() => returnLoan.mutate(activeLoanId)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Return book
      </button>
    );
  }

  // 2) There is an available copy → Loan
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

  // 3) User has an active hold & it can be cancelled
  if (userHasHold && activeHoldId) {
    return (
      <button
        onClick={() => cancelHold.mutate(activeHoldId)}
        className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
      >
        Cancel hold
      </button>
    );
  }

  // 4) User has a hold but it cannot be cancelled — read-only state
  if (userHasHold && !activeHoldId) {
    return (
      <button
        disabled
        className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
      >
        Already on hold
      </button>
    );
  }

  // 5) All copies loaned and user has no hold → Place hold
  return (
    <button
      onClick={() => createHold.mutate(bookId)}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Place hold
    </button>
  );
}
