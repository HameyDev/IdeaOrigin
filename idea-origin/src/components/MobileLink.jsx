import { Link } from "react-router-dom";

export default function MobileLink({ to, children, setIsOpen }) {
  return (
    <Link
      to={to}
      onClick={() => setIsOpen(false)}
      className="block py-2 text-gray-200 hover:text-cyan-400 transition"
    >
      {children}
    </Link>
  );
}