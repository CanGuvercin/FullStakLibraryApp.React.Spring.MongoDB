import { Outlet, NavLink, Link } from "react-router-dom";
import { useThemeStore } from "../store/themeStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";


export default function Layout() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const { isAuthenticated, logout } = useAuthStore();


  // <html class="dark"> ile Tailwind dark mode'u senkron tut
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div
      className="
        min-h-screen 
        bg-slate-50 dark:bg-slate-950
        text-slate-900 dark:text-slate-100
        transition-colors
      "
    >
      {/* Navbar */}
      <header
        className="
          bg-white dark:bg-slate-900 
          shadow-md py-4 px-8 
          flex justify-between items-center
          transition-colors
        "
      >
        <Link to="/">
          <h1 className="text-xl font-semibold text-blue-800 dark:text-blue-300 cursor-pointer hover:opacity-80 transition">
            Library App
          </h1>
        </Link>

        <nav className="space-x-6 flex items-center">
          <NavLink
            to="/me"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-300 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-slate-700 dark:text-slate-300 hover:text-blue-500"
            }
          >
            My Profile
          </NavLink>

          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-300 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-slate-700 dark:text-slate-300 hover:text-blue-500"
            }
          >
            Books
          </NavLink>

          <NavLink
            to="/members"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-300 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-slate-700 dark:text-slate-300 hover:text-blue-500"
            }
          >
            Members
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-300 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-slate-700 dark:text-slate-300 hover:text-blue-500"
            }
          >
            Settings
          </NavLink>
          <NavLink
            to="/me/my-loans"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-300 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-slate-700 dark:text-slate-300 hover:text-blue-500"
            }
          >
            My Loans
          </NavLink>

          <NavLink
            to="/me/my-holds"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-300 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-slate-700 dark:text-slate-300 hover:text-blue-500"
            }
          >
            My Holds
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/me">My Profile</NavLink>
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-600 ml-4"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}


          {/* Theme Switch */}
          <button
            onClick={toggleTheme}
            className="
              ml-4 px-3 py-1 rounded-full border 
              border-slate-400 dark:border-slate-600 
              bg-slate-100 dark:bg-slate-700
              text-slate-900 dark:text-slate-100 
              text-sm transition-colors
            "
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </nav>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        className="
          bg-slate-100 dark:bg-slate-900 
          text-center text-sm py-3
          text-slate-600 dark:text-slate-400
          transition-colors
        "
      >
        © 2025 Library App
      </footer>
    </div>
  );
}
