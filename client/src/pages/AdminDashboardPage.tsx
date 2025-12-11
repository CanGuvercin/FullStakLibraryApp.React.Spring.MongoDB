
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function AdminDashboardPage () {
  const { user } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl font-bold text-red-700 dark:text-red-400">
          Library Management
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Welcome, <span className="font-semibold">{user?.email}</span>.  
          Manage your library’s books, copies, and members.
        </p>
      </header>

      {/* Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Book List */}
        <Link
          to="/admin/books"
          className="
            bg-slate-900 border border-slate-700 rounded-xl p-6 
            hover:bg-slate-800 transition shadow-lg
          "
        >
          <h2 className="text-xl font-semibold text-white mb-2">📚 All Books</h2>
          <p className="text-slate-300 text-sm">
            View, manage or delete books in the collection.
          </p>
        </Link>

        {/* Add Book */}
        <Link
          to="/admin/books/new"
          className="
            bg-red-800 border border-red-700 rounded-xl p-6 
            hover:bg-red-700 transition shadow-lg
          "
        >
          <h2 className="text-xl font-semibold text-white mb-2">
            ➕ Add New Book
          </h2>
          <p className="text-red-200 text-sm">
            Register a new book with title, author, ISBN and metadata.
          </p>
        </Link>

        {/* Add Copy */}
        <Link
          to="/admin/copies"
          className="
            bg-indigo-800 border border-indigo-700 rounded-xl p-6 
            hover:bg-indigo-700 transition shadow-lg
          "
        >
          <h2 className="text-xl font-semibold text-white mb-2">📦 Add Copies</h2>
          <p className="text-indigo-200 text-sm">
            Add physical copies to an existing book.
          </p>
        </Link>

        {/* Members */}
        <Link
          to="/admin/members"
          className="
            bg-emerald-800 border border-emerald-700 rounded-xl p-6 
            hover:bg-emerald-700 transition shadow-lg
          "
        >
          <h2 className="text-xl font-semibold text-white mb-2">
            👥 Member List
          </h2>
          <p className="text-emerald-200 text-sm">
            View registered members and their loan/hold activity.
          </p>
        </Link>
      </div>
    </div>
  );
}
