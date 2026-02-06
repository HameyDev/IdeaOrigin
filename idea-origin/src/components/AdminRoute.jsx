import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AiOutlineStop } from "react-icons/ai"; // Error icon

export default function AdminRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-white p-10">Loading...</div>;

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/auth" />;

  // Logged in but not admin → show unauthorized message
  if (user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center pb-40 min-h-screen bg-slate-950 text-white">
        <AiOutlineStop className="text-red-500 text-9xl mb-6" />
        <h1 className="text-5xl font-bold mb-4 text-red-500">Access Denied</h1>
        <p className="text-gray-400 text-lg text-center px-4">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  // Admin → show page
  return children;
}
