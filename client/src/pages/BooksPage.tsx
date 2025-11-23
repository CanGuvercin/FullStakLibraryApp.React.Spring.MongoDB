import { useState } from "react";
import BookFilters from "../components/books/BookFilters";
import BookList from "../components/books/BookList";

export default function BooksPage() {
  const [query, setQuery] = useState("");
  

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">📚 Book List</h2>
      <BookFilters onSearch={setQuery} />
      <BookList query={query} />
    </div>
  );
}
