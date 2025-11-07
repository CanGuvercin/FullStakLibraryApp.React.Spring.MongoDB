import { useQuery } from "@tanstack/react-query";
import client from "../api/client";

export default function BooksPage() {
  // React Query kitap listesini otomatik çeker
  const { data, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: () => client.get("/books").then((res) => res.data),
  });

  if (isLoading) return <p className="p-4">Loading books...</p>;
  if (error) return <p className="p-4 text-red-500">Failed to load books.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">📚 Book List</h2>
      <ul className="space-y-2">
        {data?.map((book: any) => (
          <li
            key={book.id}
            className="bg-white shadow-sm p-3 rounded border border-gray-200"
          >
            <p className="font-medium">{book.title}</p>
            <p className="text-sm text-gray-600">{book.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
