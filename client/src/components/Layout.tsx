import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Navbar */}
      <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-600">Library App</h1>
        <nav className="space-x-6">
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-gray-700 hover:text-blue-500"
            }
          >
            Books
          </NavLink>

          <NavLink
            to="/members"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-gray-700 hover:text-blue-500"
            }
          >
            Members
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                : "text-gray-700 hover:text-blue-500"
            }
          >
            Settings
          </NavLink>
        </nav>
      </header>

      {/* Sayfa içeriği */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm py-3 text-gray-500">
        © 2025 Library App
      </footer>
    </div>
  );
}
