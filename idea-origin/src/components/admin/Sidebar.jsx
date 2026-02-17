import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const link =
    "block px-4 py-3 rounded-xl hover:bg-white/5 transition text-gray-300";

  const active =
    "bg-cyan-500/20 text-cyan-400 border border-cyan-400/30";

  return (
    <aside className="w-64 bg-slate-900 border-r border-white/10 p-6 hidden sm:flex flex-col">
      <h2 className="text-2xl font-bold mb-10 text-cyan-400">Admin Panel</h2>

      <nav className="space-y-2">

        <NavLink to="/admin" end className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
          Users
        </NavLink>

        <NavLink to="/admin/scientists" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
          Scientists
        </NavLink>

        <NavLink to="/admin/create-scientist" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
          Create Scientist
        </NavLink>

        <NavLink to="/admin/discoveries" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
          Discoveries
        </NavLink>

        <NavLink to="/admin/create-discovery" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
          Create Discovery
        </NavLink>

        <NavLink to="/admin/stories" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
          Discovery Stories
        </NavLink>

        <NavLink to="/admin/create-story" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
          Create Story
        </NavLink>

      </nav>
    </aside>
  );
}
