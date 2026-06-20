// Import router
import { Routes, Route } from "react-router-dom";

// Import pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageBooks from "../pages/admin/ManageBooks";
import AdminLayout from "../components/layout/AdminLayout";

// Import books pages
import Books from "../pages/books/Books";
import BookDetails from "../pages/books/BookDetails";

// Import borrow pages
import BorrowBook from "../pages/borrow/BorrowBook";
import BorrowHistory from "../pages/borrow/BorrowHistory";

// Import protected route
import ProtectedRoute from "../components/layout/ProtectedRoute";

// Routes
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <Books />
          </ProtectedRoute>
        }
      />

      <Route
        path="/books/:id"
        element={
          <ProtectedRoute>
            <BookDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/borrow/:id"
        element={
          <ProtectedRoute>
            <BorrowBook />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <BorrowHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/books"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout>
              <ManageBooks />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
