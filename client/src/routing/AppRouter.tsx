import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import BooksPage from "../pages/BooksPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import BookDetailPage from "../pages/BookDetailPage";
import BooksAdminPanel from "../pages/BooksAdminPanel"
import MyProfilePage from "../pages/MyProfilePage";
import MyHoldsPage from "../pages/MyHoldsPage";
import MyLoansPage from "../pages/MyLoansPage";



/*function BooksPage() {
  return <div className="p-4">📚 Books Page</div>;
}*/

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
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/admin" element={<AdminDashboardPage/>}/>
        <Route path="/admin/books" element={<BooksAdminPanel/>}  />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/me" element={<MyProfilePage/>}/>
        <Route path="/me/my-holdings" element={<MyHoldsPage/>}/>
        <Route path="/me/my-loans" element={<MyLoansPage/>} />
        <Route path="/me/loans" element={<MyLoansPage />} />
        <Route path="/me/holds" element={<MyHoldsPage />} />  
      </Route>

      {/* Yakalanamayan tüm rotalar */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
