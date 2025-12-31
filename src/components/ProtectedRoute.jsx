import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, admin }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    console.log("❌ No user, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (
    admin &&
    !(user.role === "admin" || user.isAdmin === true)
  ) {
    console.log("❌ Not admin:", user);
    return <Navigate to="/" replace />;
  }

  return children;
}
