import { useCreateLoanMutation } from "../../hooks/useCreateLoanMutation";
import { useReturnLoanMutation } from "../../hooks/useReturnLoanMutation";
import { useCreateHoldMutation } from "../../hooks/useCreateHoldMutation";
import { useCancelHoldMutation } from "../../hooks/useCancelHoldMutation";

type LoanButtonProps = {
  bookId: string;
  availableCopyId?: string | null;
  userHasLoan?: boolean;
  userHasHold?: boolean;
  activeLoanId?: string | null;
  activeHoldId?: string | null;
};

const baseButton =
  "px-4 py-2 rounded font-medium transition text-white";

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

  // 1) User already borrowed → RETURN
  if (userHasLoan && activeLoanId) {
    return (
      <button
        onClick={() => returnLoan.mutate(activeLoanId)}
        className={`${baseButton} bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600`}
      >
        Return book
      </button>
    );
  }

  // 2) Copy available → LOAN
  if (availableCopyId) {
    return (
      <button
        onClick={() => createLoan.mutate(availableCopyId)}
        className={`${baseButton} bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600`}
      >
        Loan now
      </button>
    );
  }

  // 3) User has an active hold → CANCEL HOLD
  if (userHasHold && activeHoldId) {
    return (
      <button
        onClick={() => cancelHold.mutate(activeHoldId)}
        className={`${baseButton} bg-yellow-500 hover:bg-yellow-600 text-gray-900 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-gray-900`}
      >
        Cancel hold
      </button>
    );
  }

  // 4) Already on hold (read-only)
  if (userHasHold && !activeHoldId) {
    return (
      <button
        disabled
        className={`${baseButton} bg-gray-400 text-gray-900 cursor-not-allowed dark:bg-gray-600 dark:text-gray-200`}
      >
        Already on hold
      </button>
    );
  }

  // 5) No copies, no hold → PLACE HOLD
  return (
    <button
      onClick={() => createHold.mutate(bookId)}
      className={`${baseButton} bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600`}
    >
      Place hold
    </button>
  );
}
