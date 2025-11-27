import { Link } from "react-router-dom";

type BookCardProps = {
  id: string;
  title: string;
  authors: string[];
  availableCopies: number;
};

export default function BookCard({
  id,
  title,
  authors,
  availableCopies,
}: BookCardProps) {
  return (
    <Link
      to={`/books/${id}`}
      className="
        block
        p-4 rounded-xl shadow-sm
        bg-white dark:bg-slate-800
        text-slate-900 dark:text-slate-100
        border border-blue-900 dark:border-white
        transition hover:shadow-md hover:-translate-y-0.5
      "
    >
      <h3 className="text-lg font-semibold mb-1">{title}</h3>

      <p className="text-sm text-slate-600 dark:text-slate-300">
        {authors?.length > 0 ? authors.join(", ") : "Unknown Author"}
      </p>

      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
        Available copies: {availableCopies}
      </p>
    </Link>
  );
}
