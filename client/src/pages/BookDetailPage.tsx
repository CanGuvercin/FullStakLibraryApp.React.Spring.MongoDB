import { useParams } from "react-router-dom";
import { useBookDetailQuery } from "../hooks/useBookDetailQuery";
import LoanButton from "../components/books/LoanButton";
import type { BookDetailDto, CopyDto } from "../types/BookDetail";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useBookDetailQuery(id!);

  if (isLoading)
    return <p className="p-4 text-gray-600 dark:text-gray-300">Loading book details...</p>;
  if (error)
    return <p className="p-4 text-red-500">Failed to load book details.</p>;
  if (!book)
    return <p className="p-4 text-gray-600 dark:text-gray-300">Book not found.</p>;

  return (
    <div
      className="
    max-w-3xl mx-auto p-6 rounded-xl shadow
    bg-white dark:bg-[#0a1224] 
    text-gray-900 dark:text-gray-100
    border border-blue-900 dark:border-white
  "
    >
      {/* Title */}
      <h1
        className="
          text-2xl font-bold mb-2
          text-gray-900 dark:text-white
        "
      >
        {book.title}
      </h1>

      {/* Authors */}
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {book.authors.join(", ")}
      </p>

      {/* Cover */}
      {book.coverUrl && (
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-48 rounded shadow mb-4"
        />
      )}

      {/* Metadata */}
      <div className="space-y-1 text-gray-800 dark:text-gray-300 mb-4">
        <p>
          <strong className="text-gray-900 dark:text-gray-100">ISBN:</strong>{" "}
          {book.isbn}
        </p>
        <p>
          <strong className="text-gray-900 dark:text-gray-100">Publication Year:</strong>{" "}
          {book.publicationYear ?? "Unknown"}
        </p>
        <p>
          <strong className="text-gray-900 dark:text-gray-100">Total copies:</strong>{" "}
          {book.totalCopies}
        </p>
        <p>
          <strong className="text-gray-900 dark:text-gray-100">Available copies:</strong>{" "}
          {book.availableCount}
        </p>
      </div>

      {/* Description */}
      {book.description && (
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-1 text-gray-900 dark:text-gray-100">
            Description
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{book.description}</p>
        </div>
      )}

      {/* Tags */}
      {book.tags?.length > 0 && (
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
            Tags
          </h2>
          <div className="flex gap-2 flex-wrap">
            {book.tags.map((tag: string) => (
              <span
                key={tag}
                className="
                  px-3 py-1 rounded-full text-sm 
                  bg-gray-200 text-gray-800
                  dark:bg-gray-700 dark:text-gray-200
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Loan Button */}
      <div className="my-4">
        <LoanButton
          bookId={book.id}
          availableCopyId={book.availableCopyId}
          userHasLoan={book.userHasLoan}
          userHasHold={book.userHasHold}
          activeLoanId={book.activeLoanId}
          activeHoldId={book.activeHoldId}
        />
      </div>

      {/* Copies */}
      <div>
        <h2 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
          Copies
        </h2>
        <ul className="space-y-2">
          {book.copies?.map((c: CopyDto) => (
            <li
              key={c.id}
              className="
                p-3 border rounded text-sm flex justify-between
                border-gray-300 text-gray-800
                dark:border-gray-600 dark:text-gray-300
              "
            >
              <span>Copy ID: {c.id}</span>
              <span>Status: {c.status}</span>
              <span>Location: {c.location}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
