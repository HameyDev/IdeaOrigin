import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import GradientButton from "../components/GradientButton";

export default function ScientistProfile() {
  const { id } = useParams();
  const [scientist, setScientist] = useState(null);
  const [discoveries, setDiscoveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch scientist details
        const sciRes = await axios.get(
          `http://localhost:5000/api/scientists/${id}`,
        );
        const sciData = sciRes.data.data;

        console.log(sciData);

        // Keep arrays as arrays
        sciData.story = sciData.story || [];
        sciData.impact = sciData.impact || [];
        sciData.quotes = sciData.quotes || [];
        sciData.funFacts = sciData.funFacts || [];

        setScientist(sciData);

        // Fetch discoveries of this scientist
        const disRes = await axios.get(
          `http://localhost:5000/api/discoveries/scientist/${id}`,
        );
        setDiscoveries(disRes.data.data);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-cyan-400">
        Loading Scientist...
      </div>
    );
  }

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
          {scientist.tagline || "A mind that reshaped how humanity understands reality."}
        </p>
      </section>

      {/* ================= PROFILE CARD ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            {/* IMAGE */}
            <div
              className="rounded-2xl overflow-hidden border border-white/10 shadow-inner hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]
                   transition-all duration-300 "
            >
              <img
                src={`http://localhost:5000${scientist.image}`}
                crossOrigin="anonymous"
                alt={scientist.name}
                className="w-full h-80 object-cover"
              />
            </div>

            {/* QUICK FACTS */}
            <div className="md:col-span-2 space-y-6">
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
            <h2 className="text-3xl font-bold text-cyan-400 mb-2">
              Life & Journey
            </h2>
            <div className="text-gray-300 text-lg space-y-4">
              {scientist.story.length > 0 ? (
                scientist.story.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p>No story available.</p>
              )}
            </div>
          </div>

          {/* ================= DISCOVERIES ================= */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-cyan-400 mb-8">
              Famous Discoveries
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {discoveries.map((d) => (
                <Link
                  key={d._id}
                  to={`/discovery/${d._id}`}
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
            <h2 className="text-3xl font-bold text-cyan-400 mb-2">
              Impact & Legacy
            </h2>
            <div className="text-gray-300 text-lg space-y-2">
              {scientist.impact.length > 0 ? (
                scientist.impact.map((item, index) => <p key={index}>{item}</p>)
              ) : (
                <p>No impact information available.</p>
              )}
            </div>
          </div>

          {/* ================= QUOTES ================= */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-cyan-400 mb-2">
              Famous Quotes
            </h2>
            <div className="text-gray-300 text-lg space-y-2">
              {scientist.quotes.length > 0 ? (
                scientist.quotes.map((quote, index) => <p key={index}>"{quote}"</p>)
              ) : (
                <p>No quotes available.</p>
              )}
            </div>
          </div>

          {/* ================= FUN FACTS ================= */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-emerald-400 mb-2">
              Fun Facts
            </h2>
            <div className="text-gray-300 text-lg space-y-2">
              {scientist.funFacts.length > 0 ? (
                scientist.funFacts.map((fact, index) => <p key={index}>{fact}</p>)
              ) : (
                <p>No fun facts available.</p>
              )}
            </div>
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
