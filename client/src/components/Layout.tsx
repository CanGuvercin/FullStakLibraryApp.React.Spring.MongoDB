import { Outlet, NavLink } from "react-router-dom";
import { useThemeStore } from "../store/themeStore";

export default function Layout() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-8 flex justify-between items-center transition-colors">
        <h1 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Library App
        </h1>

        <nav className="space-x-6 flex items-center">
          <NavLink
            to="/me"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-300 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
            }
          >
            My Profile
          </NavLink>

          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-300 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
            }
          >
            Books
          </NavLink>

          <NavLink
            to="/members"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-300 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
            }
          >
            Members
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-300 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
            }
          >
            Settings
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-300 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/me/loans"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-300 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
            }
          >
            My Loans
          </NavLink>

          <NavLink
            to="/me/holds"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-300 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
            }
          >
            My Holds
          </NavLink>

          {/* 🌙 DARK MODE SWITCH */}
          <button
            onClick={toggleTheme}
            className="ml-4 px-3 py-1 rounded-full border border-gray-400 dark:border-gray-600 text-sm
                       bg-gray-100 dark:bg-gray-700 dark:text-gray-100 text-gray-900 transition-colors"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </nav>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <Outlet />
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 text-center text-sm py-3 text-gray-500 dark:text-gray-400">
        © 2025 Library App
      </footer>
    </div>
  );
}
