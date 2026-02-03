import { useState } from "react";
import { Link } from "react-router-dom";

export default function EditStories() {
  const [discoveries, setDiscoveries] = useState([
    {
      id: "relativity",
      title: "Theory of Relativity",
      scientist: "Albert Einstein",
      year: "1905",
    },
    {
      id: "gravity",
      title: "Law of Gravity",
      scientist: "Isaac Newton",
      year: "1687",
    },
    {
      id: "ac",
      title: "AC Electricity",
      scientist: "Nikola Tesla",
      year: "1890",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      setDiscoveries(discoveries.filter((d) => d.id !== id));
    }
  };

  const handleEdit = (id) => {
    alert("Edit functionality coming soon for: " + id);
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen px-4 sm:px-6 lg:px-10 py-10">

      {/* HEADER */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">Edit Discoveries</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Edit or remove stories from the platform.
        </p>
        <Link
          to="/admin"
          className="inline-block mt-2 text-indigo-400 hover:text-indigo-300 text-sm sm:text-base"
        >
          ← Back to Admin Panel
        </Link>
      </div>

      {/* DISCOVERY TABLE */}
      <div className="bg-slate-900 rounded-2xl overflow-x-auto shadow-lg">
        <table className="min-w-full divide-y divide-slate-700">
          <thead>
            <tr className="bg-slate-800">
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                Title
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                Scientist
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
                Year
              </th>
              <th className="px-4 sm:px-6 py-3 text-center text-xs sm:text-sm font-medium text-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-700">
            {discoveries.map((d) => (
              <tr key={d.id} className="hover:bg-slate-800">
                <td className="px-4 sm:px-6 py-3 text-gray-200 text-sm sm:text-base">{d.title}</td>
                <td className="px-4 sm:px-6 py-3 text-gray-400 text-sm sm:text-base">{d.scientist}</td>
                <td className="px-4 sm:px-6 py-3 text-gray-300 text-sm sm:text-base">{d.year}</td>
                <td className="px-4 sm:px-6 py-3 flex flex-wrap justify-center gap-2 sm:gap-3">
                  <button
                    className="px-3 py-1 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition text-xs sm:text-sm"
                    onClick={() => handleEdit(d.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700 transition text-xs sm:text-sm"
                    onClick={() => handleDelete(d.id)}
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
