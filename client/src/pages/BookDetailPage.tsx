import { useParams } from "react-router-dom";
import { useBookDetailQuery } from "../hooks/useBookDetailQuery";
import LoanButton from "../components/books/LoanButton";
import type { BookDetailDto, CopyDto } from "../types/BookDetail"; // TYPE IMPORT, direct declaration is better?

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useBookDetailQuery(id!);

  if (isLoading) return <p className="p-4 text-gray-500">Loading book details...</p>;
  if (error) return <p className="p-4 text-red-500">Failed to load book details.</p>;
  if (!book) return <p className="p-4 text-gray-500">Book not found.</p>;

  return (
    <div className="
      max-w-3xl mx-auto p-6 rounded shadow
     bg-white dark:bg-gray-800
     text-gray-900 dark:text-gray-100
    ">

      {/* Title + Authors */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
        <p className="text-gray-700 text-lg mt-1">{book.authors.join(", ")}</p>
      </div>

      {/* Cover */}
      {book.coverUrl && (
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-48 rounded shadow"
        />
      )}

      {/* Metadata */}
      <div className="space-y-1 text-gray-700">
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Publication Year:</strong> {book.publicationYear ?? "Unknown"}</p>
        <p><strong>Total copies:</strong> {book.totalCopies}</p>
        <p><strong>Available copies:</strong> {book.availableCount}</p>
      </div>

      {/* Description */}
      {book.description && (
        <div>
          <h2 className="font-semibold text-lg text-gray-900 mb-2">Description</h2>
          <p className="text-gray-700">{book.description}</p>
        </div>
      )}

      {/* Tags */}
      {book.tags?.length > 0 && (
        <div>
          <h2 className="font-semibold text-lg text-gray-900 mb-2">Tags</h2>
          <div className="flex gap-2 flex-wrap">
            {book.tags.map((tag:string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Loan Button */}
      <LoanButton
        bookId={book.id}
        availableCopyId={book.availableCopyId}
        userHasLoan={book.userHasLoan}
        userHasHold={book.userHasHold}
        activeLoanId={book.activeLoanId}
        activeHoldId={book.activeHoldId}
      />

      {/* Copies List */}
      <div>
        <h2 className="font-semibold text-lg text-gray-900 mb-2">Copies</h2>
        <ul className="space-y-2">
          {book.copies?.map((c:CopyDto) => (
            <li
              key={c.id}
              className="p-3 border rounded text-sm text-gray-700 flex justify-between"
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
