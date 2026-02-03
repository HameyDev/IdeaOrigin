import { Link } from "react-router-dom";

export default function GradientButton({
  to,
  children,
  className = "",
}) {
  return (
    <Link
      to={to}
      className={`
        inline-block px-12 py-4 items-center rounded-2xl font-semibold
        bg-gradient-to-r from-cyan-500 to-emerald-600
        text-white shadow-lg shadow-emerald-500/30
        hover:scale-105 transition-transform
        ${className}
      `}
    >
      {children}
    </Link>
  );
}
