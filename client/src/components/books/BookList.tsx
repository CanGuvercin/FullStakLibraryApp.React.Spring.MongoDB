import { useBooksQuery } from "../../hooks/useBooksQuery";
import BookCard from "./BookCard";

type BookListProps = {
  query: string;
};

export default function BookList({ query }: BookListProps) {
  const { data, isLoading, error } = useBooksQuery(query);

  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Failed to load books.</p>;

  return (
    <div className="
    grid grid-cols-1 md:grid-cols-2 gap-4
    // need more styling for dark mode
    ">
      {data?.map((book: any) => (
        <BookCard key={book.id} {...book} />
      ))}
    </div>
  );
}
