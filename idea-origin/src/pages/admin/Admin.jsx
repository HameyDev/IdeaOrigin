import { Link } from "react-router-dom";

export default function Admin() {
  const stats = [
    { label: "Total Users", value: 124 },
    { label: "Discoveries", value: 32 },
    { label: "Scientists", value: 15 },
    { label: "Stories", value: 48 },
  ];

  const actions = [
    { id: 1, text: "Add New Discovery", link: "/admin/add-discovery" },
    { id: 2, text: "Add New Scientist", link: "/admin/add-scientist" },
    { id: 3, text: "Manage Users", link: "/admin/users" },
    { id: 4, text: "Edit Stories", link: "/admin/stories" },
    { id: 5, text: "Edit Scientists", link: "/admin/scientists" },
  ];

  return (
    <div className="bg-slate-950 text-white min-h-screen px-4 sm:px-6 lg:px-10 py-8 sm:py-10">

      {/* HEADER */}
      <div className="mb-8 sm:mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Admin Panel</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Manage Discovery Stories platform
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
        {stats.map((item) => (
          <div
            key={item.label}
            className="bg-slate-900 rounded-2xl p-4 sm:p-6 text-center"
          >
            <p className="text-2xl sm:text-3xl font-bold text-indigo-500">{item.value}</p>
            <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">{item.label}</p>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

        {/* QUICK ACTIONS */}
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 mb-6 lg:mb-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Quick Actions</h2>

          <div className="flex flex-col gap-3 sm:gap-4">
            {actions.map((a) => (
              <Link
                key={a.id}
                to={a.link}
                className="bg-indigo-600 text-center py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-indigo-700 transition"
              >
                {a.text}
              </Link>
            ))}
          </div>
        </div>

        {/* RECENT CHANGES */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Recent Changes</h2>

          <ul className="space-y-3 sm:space-y-4">
            <li className="bg-slate-800 p-3 sm:p-4 rounded-xl text-gray-300 text-sm sm:text-base">
              Added new story: DNA Structure
            </li>
            <li className="bg-slate-800 p-3 sm:p-4 rounded-xl text-gray-300 text-sm sm:text-base">
              Updated scientist profile: Albert Einstein
            </li>
            <li className="bg-slate-800 p-3 sm:p-4 rounded-xl text-gray-300 text-sm sm:text-base">
              New user registered: johndoe@gmail.com
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
