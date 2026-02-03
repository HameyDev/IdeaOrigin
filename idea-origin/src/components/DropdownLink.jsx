import { Link } from "react-router-dom";

export default function DropdownLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-3 text-gray-200 hover:bg-emerald-600/20 hover:text-cyan-400 transition"
    >
      {children}
    </Link>
  );
}