// Each Book will shown under this frame
import { Link } from "react-router-dom"

type BookCardProps = {
  id: string;
  title: string;
  authors: string[];
  availableCopies: number;
};


// this type bugged before, be careful 
// 23 november, dont worry bugged many times


export default function BookCard({ id, title, authors, availableCopies, }: BookCardProps) {
  return (
    <Link
      to={`/books/${id}`}
      className="
      p-4 rounded shadow 
       bg-white dark:bg-gray-800 
       text-gray-900 dark:text-gray-100
       border border-gray-200 dark:border-gray-700"
      >
      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="
       bg-oklch(95% 0.052 163.051) dark:bg-gray-800 
       text-gray-900 dark:text-gray-100
      ">
        {authors?.length > 0 ? authors.join(", ") : "Unknown Author"}
      </p>

      <p className="
      bg-oklch(95% 0.052 163.051) dark:bg-gray-800 
       text-gray-900 dark:text-gray-100
      ">
        Available copies: {availableCopies}
      </p>
    </Link>
  );
}


