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


export default function BookCard({  id, title, authors, availableCopies,}: BookCardProps) {
  return (
    <Link
      to={`/books/${id}`}
      className="block p-4 bg-white rounded shadow hover:shadow-md transition"
    >
      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="text-gray-600 mt-1">
        {authors?.length > 0 ? authors.join(", ") : "Unknown Author"}
      </p>

      <p className="text-gray-700 mt-1">
        Available copies: {availableCopies}
      </p>
    </Link>
  );
}


