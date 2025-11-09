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
      {/* Kapak ve temel bilgiler */}
      <div className="flex gap-6">
        {book.coverUrl && (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-40 h-56 object-cover rounded"
          />
        )}
        <div>
          <h2 className="text-2xl font-semibold mb-1">{book.title}</h2>
          <p className="text-gray-700 mb-2">
            by {book.authors?.join(", ") || "Unknown Author"}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Tags: {book.tags?.join(", ") || "No tags"}
          </p>
          <p className="text-gray-700 mb-6">{book.description}</p>

          {/* 💥 Poseidon’un mızrağı burada HEMİDE 4 BAŞLI HEHEHHE */}
          <LoanButton
            availableCopyId={book.availableCopyId}
            userHasLoan={book.userHasLoan}
            userHasHold={book.userHasHold}
            currentHoldId={book.currentHoldId}
          />
        </div>
      </div>

      {/* Alt bilgi */}
      <div className="mt-8 border-t pt-4 text-sm text-gray-500">
        Available copies: {book.availableCount ?? 0}
      </div>
    </div>
  );
}
