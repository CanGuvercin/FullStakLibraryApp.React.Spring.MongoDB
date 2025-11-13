// Each Book will shown under this frame
import { Link } from "react-router-dom"

type BookCardProps = {
  id: string;
  title: string;
  author: string;
};

// this type bugged before, be careful 

export default function BookCard({ id, title, author }: BookCardProps) {
  return (
    <div className="p-4 bg-white rounded shadow hover:shadow-md transition">
       <Link
      to={`/books/${id}`}
      className="block p-4 bg-white rounded shadow hover:shadow-md transition"
      ></Link>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{author}</p>
    </div>
  );
}
