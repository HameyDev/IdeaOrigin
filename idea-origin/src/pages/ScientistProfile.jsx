import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import GradientButton from "../components/GradientButton";

export default function ScientistProfile() {
  const { id } = useParams();
  const [scientist, setScientist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/scientists/${id}`)
      .then((res) => {
        setScientist(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-cyan-400">
        Loading Scientist...
      </div>
    );
  }

  console.log(scientist);

  if (!scientist) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <h2 className="text-3xl">Scientist not found</h2>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-black via-[#14132A] to-black text-white min-h-screen pb-20">
      {/* ================= HERO ================= */}
      <section className="relative py-16 text-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_60%)]" />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-5xl sm:text-6xl md:text-7xl font-extrabold
          bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400"
        >
          {scientist.name}
        </motion.h1>

        <p className="mt-4 text-cyan-400 text-lg">{scientist.field}</p>

        <p className="mt-6 max-w-2xl mx-auto text-gray-300 text-lg italic">
          {scientist.tagline ||
            "A mind that reshaped how humanity understands reality."}
        </p>
      </section>

      {/* ================= PROFILE CARD ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          {/* IMAGE + FACTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            {/* IMAGE */}
            <div
              className="rounded-2xl overflow-hidden border border-white/10 shadow-inner hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]
                   transition-all duration-300 "
            >
              <img
                src={scientist.image}
                alt={scientist.name}
                className="w-full h-80 object-cover"
              />
            </div>

            {/* QUICK FACTS */}
            <div className="md:col-span-2 space-y-6">
              {/* ROW WITH 2 COLUMNS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  ["Born", scientist.born],
                  ["Died", scientist.died],
                  ["Nationality", scientist.nationality],
                  ["Era", scientist.era],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className="group relative bg-slate-900/80
                   backdrop-blur-md rounded-2xl p-6 px-2 flex flex-col items-center
                   border border-white/20 shadow-lg hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]
                   transition-all duration-300"
                  >
                    <p className="text-sm text-gray-400 mb-2">{label}</p>
                    <p className="md:text-md sm:text-xl font-bold text-white group-hover:text-cyan-400 transition">
                      {value || "N/A"}
                    </p>
                    {/* subtle glowing accent */}
                    <div className="absolute -bottom-2 w-12 h-1 bg-cyan-400/50 rounded-full animate-pulse"></div>
                  </div>
                ))}
              </div>

              {/* SHORT BIO */}
              <p className="text-gray-300 leading-relaxed text-lg mt-6">
                {scientist.bio || "No bio available."}
              </p>
            </div>
          </div>

          {/* ================= LIFE STORY ================= */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">
              Life & Journey
            </h2>

            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              {(scientist.story || []).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* ================= DISCOVERIES ================= */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-cyan-400 mb-8">
              Famous Discoveries
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {(scientist.discoveries || []).map((d) => (
                <Link
                  key={d.id}
                  to={`/discovery/${d.id}`}
                  className="group bg-slate-900/80 p-6 rounded-2xl
                  border border-white/10 hover:border-cyan-400
                  hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]
                  transition-all"
                >
                  <h3 className="text-xl font-semibold group-hover:text-cyan-400">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-gray-400 text-sm">{d.year}</p>
                  <p className="mt-4 text-cyan-400 font-medium text-sm">
                    Read Discovery →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* ================= IMPACT ================= */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">
              Impact & Legacy
            </h2>

            <ul className="space-y-3 text-gray-300 text-lg">
              {(scientist.impact || []).map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>

          {/* ================= QUOTES ================= */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">
              Famous Quotes
            </h2>

            <div className="space-y-6">
              {(scientist.quotes || []).map((quote, i) => (
                <blockquote
                  key={i}
                  className="border-l-4 border-cyan-400 pl-6 italic text-gray-200 text-lg"
                >
                  “{quote}”
                </blockquote>
              ))}
            </div>
          </div>

          {/* ================= FUN FACTS ================= */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-emerald-400 mb-6">
              Fun Facts
            </h2>

            <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
              {(scientist.funFacts || []).map((fact, i) => (
                <li key={i}>{fact}</li>
              ))}
            </ul>
          </div>

          {/* ================= CTA ================= */}
          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold mb-6">
              Continue Exploring Great Minds
            </h3>

            <GradientButton to="/explore-scientists">
              Explore Scientists
            </GradientButton>
          </div>
        </div>
      </section>
    </div>
  );
}
