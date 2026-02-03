import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />

      {/* Ambient Glows */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px]
                      bg-cyan-400/10 blur-[120px] rounded-full" />
      <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px]
                      bg-emerald-400/10 blur-[140px] rounded-full" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-extrabold tracking-wide
                           text-transparent bg-clip-text
                           bg-gradient-to-r from-cyan-400 to-emerald-400 flex items-center gap-2">
              <img
                src="/logo.png"
                alt="IdeaOrigin Logo"
                className="w-10 h-10 object-contain text-cyan-400"
              />
              IdeaOrigin
            </h3>
            <p className="mt-3 text-sm text-gray-400 max-w-xs mx-auto md:mx-0">
              Exploring the stories, struggles, and breakthroughs behind the
              world’s greatest ideas.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-8 text-sm sm:text-base text-gray-300">
            <Link
              to="/"
              className="relative group hover:text-cyan-400 transition"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-[1px]
                               bg-cyan-400 transition-all duration-300
                               group-hover:w-full" />
            </Link>

            <Link
              to="/explore"
              className="relative group hover:text-cyan-400 transition"
            >
              Explore
              <span className="absolute -bottom-1 left-0 w-0 h-[1px]
                               bg-cyan-400 transition-all duration-300
                               group-hover:w-full" />
            </Link>

            <Link
              to="/about"
              className="relative group hover:text-cyan-400 transition"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-[1px]
                               bg-cyan-400 transition-all duration-300
                               group-hover:w-full" />
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} IdeaOrigin
            </p>
            <p className="text-xs mt-1 text-gray-500">
              Crafted with curiosity & purpose
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/10" />
      </div>
    </footer>
  );
}
