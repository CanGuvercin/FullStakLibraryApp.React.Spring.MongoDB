import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../api/bookApi";

export default function BookDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: () => bookApi.getById(id!),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Book not found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
      <p className="text-lg text-gray-600 mb-4">{data.author}</p>
      <p className="text-gray-700">{data.description}</p>
    </div>
  );
}
