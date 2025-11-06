import { Outlet } from "react-router-dom";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Navbar */}
      <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-600">Library App</h1>
        <nav className="space-x-4">
          <a href="/books" className="hover:text-blue-500">
            Books
          </a>
          <a href="/members" className="hover:text-blue-500">
            Members
          </a>
          <a href="/settings" className="hover:text-blue-500">
            Settings
          </a>
        </nav>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-6 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm py-3 text-gray-500">
        © 2025 Library App
      </footer>
    </div>
  );
}
