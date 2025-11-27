import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div
      className="
        min-h-screen 
        flex flex-col items-center justify-center
        bg-slate-50 dark:bg-slate-950
        text-slate-900 dark:text-slate-100
        transition-colors
      "
    >
      <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-300">
        Welcome to Library App 📚
      </h1>

      <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl text-center mt-4">
        Discover thousands of books, manage your loans,
        place holds and explore the world of reading.
      </p>

      <div className="flex gap-4 mt-8">
        <Link
          to="/books"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Browse Books
        </Link>

        {isAuthenticated ? (
          <Link
            to="/me"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            My Profile
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
