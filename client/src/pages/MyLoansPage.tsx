// src/pages/MyLoansPage.tsx
import { useMyLoansQuery } from "../hooks/useMyLoanQuery";
import { useReturnLoanMutation } from "../hooks/useReturnLoanMutation";

type Loan = {
  id: string;
  bookTitle: string;
  loanedAt: string;
  dueAt: string;
  status: string;
};

export default function MyLoansPage() {
  const { data, isLoading, error } = useMyLoansQuery();
  const returnLoan = useReturnLoanMutation();

  if (isLoading) return <p className="p-4 text-gray-500">Loading your loans...</p>;
  if (error) return <p className="p-4 text-red-500">Failed to load your loans.</p>;

  const loans: Loan[] = data ?? [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">My Loans</h1>

      {loans.length === 0 ? (
        <p className="text-gray-600">You have no active loans.</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Book</th>
              <th className="text-left py-2">Loaned at</th>
              <th className="text-left py-2">Due at</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2"></th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id} className="border-b">
                <td className="py-2">{loan.bookTitle}</td>
                <td className="py-2">{loan.loanedAt}</td>
                <td className="py-2">{loan.dueAt}</td>
                <td className="py-2">{loan.status}</td>
                <td className="py-2">
                  {loan.status === "ACTIVE" && (
                    <button
                      onClick={() => returnLoan.mutate(loan.id)}
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
