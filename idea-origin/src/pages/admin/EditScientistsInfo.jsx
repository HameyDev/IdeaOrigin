import { useState } from "react";
import { Link } from "react-router-dom";

export default function EditScientistsInfo() {
  const [scientists, setScientists] = useState([
    { id: "einstein", name: "Albert Einstein", field: "Physics", born: 1879, died: 1955 },
    { id: "tesla", name: "Nikola Tesla", field: "Physics", born: 1856, died: 1943 },
    { id: "newton", name: "Isaac Newton", field: "Physics", born: 1643, died: 1727 },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this scientist?")) {
      setScientists(scientists.filter((s) => s.id !== id));
    }
  };

  const handleEdit = (id) => {
    alert("Edit functionality coming soon for: " + id);
    // Later, navigate to /admin/edit-scientist/:id
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen px-4 sm:px-6 lg:px-10 py-10">

      {/* HEADER */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">Edit Scientists</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Edit or remove scientists from the platform.
        </p>
        <Link
          to="/admin"
          className="inline-block mt-2 text-indigo-400 hover:text-indigo-300 text-sm sm:text-base"
        >
          ← Back to Admin Panel
        </Link>
      </div>

      {/* SCIENTIST TABLE */}
      <div className="bg-slate-900 rounded-2xl overflow-x-auto shadow-lg">
        <table className="min-w-full divide-y divide-slate-700">
          <thead>
            <tr className="bg-slate-800">
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                Name
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                Field
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                Born
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                Died
              </th>
              <th className="px-4 sm:px-6 py-3 text-center text-xs sm:text-sm font-medium text-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-700">
            {scientists.map((s) => (
              <tr key={s.id} className="hover:bg-slate-800">
                <td className="px-4 sm:px-6 py-3 text-gray-200 text-sm sm:text-base">{s.name}</td>
                <td className="px-4 sm:px-6 py-3 text-gray-400 text-sm sm:text-base">{s.field}</td>
                <td className="px-4 sm:px-6 py-3 text-gray-300 text-sm sm:text-base">{s.born}</td>
                <td className="px-4 sm:px-6 py-3 text-gray-300 text-sm sm:text-base">{s.died || "—"}</td>
                <td className="px-4 sm:px-6 py-3 flex flex-wrap justify-center gap-2 sm:gap-3">
                  <button
                    className="px-3 py-1 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition text-xs sm:text-sm"
                    onClick={() => handleEdit(s.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700 transition text-xs sm:text-sm"
                    onClick={() => handleDelete(s.id)}
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
