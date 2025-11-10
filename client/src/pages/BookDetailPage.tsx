// src/pages/BookDetailPage.tsx
import { useParams } from "react-router-dom";
import { useBookDetailQuery } from "../hooks/useBookDetailQuery";
import LoanButton from "../components/books/LoanButton";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useBookDetailQuery(id!);

  if (isLoading) return <p className="p-4 text-gray-500">Loading book details...</p>;
  if (error) return <p className="p-4 text-red-500">Failed to load book details.</p>;
  if (!book) return <p className="p-4 text-gray-500">Book not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      {/* ... diğer book info ... */}

      <LoanButton
        bookId={book.id}
        availableCopyId={book.availableCopyId}
        userHasLoan={book.userHasLoan}
        userHasHold={book.userHasHold}
        activeLoanId={book.activeLoanId}
        activeHoldId={book.activeHoldId}
      />

      <div className="mt-8 border-t pt-4 text-sm text-gray-500">
        Available copies: {book.availableCount ?? 0}
      </div>
    </div>
  );
}
