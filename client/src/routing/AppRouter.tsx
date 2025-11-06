import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";

function BooksPage() {
  return <div className="p-4">📚 Books Page</div>;
}

function MembersPage() {
  return <div className="p-4">👥 Members Page</div>;
}

function SettingsPage() {
  return <div className="p-4">⚙️ Settings Page</div>;
}

function NotFoundPage() {
  return <div className="p-4 text-red-500">404 - Page Not Found</div>;
}

export default function AppRouter() {
  return (
    <Routes>
      {/* Root yönlendirme */}
      <Route path="/" element={<Navigate to="/books" replace />} />

      {/* Layout altında tüm sayfalar */}
      <Route element={<Layout/>}>
        <Route path="/books" element={<BooksPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Yakalanamayan tüm rotalar */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
