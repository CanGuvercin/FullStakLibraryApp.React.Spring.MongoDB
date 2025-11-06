import { Routes, Route, Navigate } from 'react-router-dom';

function BooksPage() {
  return <div className="p-4">Books Page ✅</div>;
}

function LoginPage() {
  return <div className="p-4">Login Page ✅</div>;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/books" replace />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<div className="p-4">404 Not Found</div>} />
    </Routes>
  );
}
