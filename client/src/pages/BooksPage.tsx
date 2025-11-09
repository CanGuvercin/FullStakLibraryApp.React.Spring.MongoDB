import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../api/bookApi";
import { Link } from "react-router-dom";

export default function BooksPage() {
  // redefined by GPT for queryFN
  const { data, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: bookApi.getAll,
  });

  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Failed to load books.</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold mb-4">📚 Book List</h2>
      {data?.map((book: any) => (
        <Link
          key={book.id}
          to={`/books/${book.id}`}
          className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold">{book.title}</h3>
          <p className="text-gray-600">{book.author}</p>
        </Link>
      ))}
    </div>
  );
}
