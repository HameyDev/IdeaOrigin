import { Link } from "react-router-dom";

export default function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="relative text-gray-200 hover:text-cyan-400 transition
      after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px]
      after:bg-cyan-400 after:transition-all hover:after:w-full"
    >
      {children}
    </Link>
  );
}