import { useCreateLoanMutation } from "../../hooks/useCreateLoanMutation";
import { useReturnLoanMutation } from "../../hooks/useReturnLoanMutation";
import { useCreateHoldMutation } from "../../hooks/useCreateHoldMutation";
import { useCancelHoldMutation } from "../../hooks/useCancelHoldMutation";


type LoanButtonProps = {
  bookId: string;                 // hold için gerekli
  availableCopyId?: string | null;
  userHasLoan?: boolean;
  userHasHold?: boolean;
  activeLoanId?: string | null;   // return için
  activeHoldId?: string | null;   // cancel hold için
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

  // tüm kopyalar dolu + userHasLoan = false + userHasHold = false
  return (
    <button
      onClick={() => createHold.mutate(bookId)}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Place hold
    </button>
  );
}