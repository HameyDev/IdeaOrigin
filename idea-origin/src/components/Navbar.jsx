import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import DropdownLink from "./DropdownLink";
import MobileLink from "./MobileLink";
import GradientButton from "../components/GradientButton";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const { user, isLoggedIn } = useContext(AuthContext);
  const role = user?.role?.toLowerCase();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-950 via-teal-950 to-slate-950 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400"
        >
          <img src="/logo.png" alt="IdeaOrigin Logo" className="w-10 h-10" />
          IdeaOrigin
        </Link>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/">Home</NavLink>

          {/* Explore */}
          <div className="relative">
            <button
              onClick={() => setIsExploreOpen(!isExploreOpen)}
              className="text-gray-200 hover:text-cyan-400"
            >
              Explore ▾
            </button>

            {isExploreOpen && (
              <div className="absolute top-full mt-3 w-52 rounded-2xl bg-slate-900 border border-white/10 shadow-xl">
                <DropdownLink to="/explore-scientists" onClick={() => setIsExploreOpen(false)}>
                  Scientists
                </DropdownLink>
                <DropdownLink to="/explore-discovery" onClick={() => setIsExploreOpen(false)}>
                  Discoveries
                </DropdownLink>
              </div>
            )}
          </div>

          <NavLink to="/timeline">Timeline</NavLink>
          <NavLink to="/about">About</NavLink>

          {/* 🔐 AUTH */}
          {!isLoggedIn && <NavLink to="/auth">Login</NavLink>}

          {isLoggedIn && user && (
            <>
              {/* USER → Gradient Dashboard */}
              {role === "user" && (
                <GradientButton to="/dashboard">Dashboard</GradientButton>
              )}

              {/* ADMIN → Normal NavLink Dashboard (like About/Timeline) */}
              {role === "admin" && (
                <NavLink to="/dashboard">Dashboard</NavLink>
              )}

              {/* ADMIN → Gradient Admin Dashboard */}
              {role === "admin" && (
                <GradientButton to="/admin">Admin Dashboard</GradientButton>
              )}
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-xl text-gray-200">
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-t border-white/10 px-6 pb-6 space-y-4">
          <MobileLink to="/" setIsOpen={setIsOpen}>Home</MobileLink>
          <MobileLink to="/timeline" setIsOpen={setIsOpen}>Timeline</MobileLink>
          <MobileLink to="/about" setIsOpen={setIsOpen}>About</MobileLink>

          {!isLoggedIn && (
            <MobileLink to="/auth" setIsOpen={setIsOpen}>Login</MobileLink>
          )}

          {isLoggedIn && user && (
            <>
              <MobileLink to="/dashboard" setIsOpen={setIsOpen}>Dashboard</MobileLink>

              {role === "admin" && (
                <MobileLink to="/admin" setIsOpen={setIsOpen}>Admin Dashboard</MobileLink>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
}
