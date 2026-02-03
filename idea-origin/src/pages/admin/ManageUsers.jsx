import { useState } from "react";
import { Link } from "react-router-dom";

export default function ManageUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "user" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
    { id: 3, name: "Admin User", email: "admin@example.com", role: "admin" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen px-4 sm:px-6 lg:px-10 py-10">

      {/* HEADER */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">Manage Users</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          View, edit, or remove users from the platform.
        </p>
        <Link
          to="/admin"
          className="inline-block mt-2 text-indigo-400 hover:text-indigo-300 text-sm sm:text-base"
        >
          ← Back to Admin Panel
        </Link>
      </div>

      {/* USER TABLE */}
      <div className="bg-slate-900 rounded-2xl overflow-x-auto shadow-lg">
        <table className="min-w-full divide-y divide-slate-700">
          <thead>
            <tr className="bg-slate-800">
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 sm:px-6 py-3 text-center text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-800 transition-colors">
                <td className="px-4 sm:px-6 py-4 text-gray-200 text-sm sm:text-base">{user.name}</td>
                <td className="px-4 sm:px-6 py-4 text-gray-400 text-sm sm:text-base">{user.email}</td>
                <td className="px-4 sm:px-6 py-4 text-gray-300 capitalize text-sm sm:text-base">{user.role}</td>
                <td className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3">
                  <button
                    className="w-full sm:w-auto px-3 py-1 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base"
                    onClick={() => alert("Edit functionality coming soon!")}
                  >
                    Edit
                  </button>
                  <button
                    className="w-full sm:w-auto px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700 transition text-sm sm:text-base"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
