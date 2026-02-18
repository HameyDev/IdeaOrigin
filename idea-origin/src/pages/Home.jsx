import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import GradientButton from "../components/GradientButton";
import CountUp from "../components/CountUp";
import FeaturedCard from "../components/FeaturedCard";
import StatCard from "../components/StatCard";

import { motion } from "framer-motion";
import { fadeUp } from "../animations/scrollAnimations";

export default function Home() {
  const [scientists, setScientists] = useState([]);
  const [discoveries, setDiscoveries] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sciRes, disRes] = await Promise.all([
          axios.get("https://ideaoriginbackend.onrender.com/api/scientists"),
          axios.get("https://ideaoriginbackend.onrender.com/api/discoveries"),
        ]);

        setScientists(sciRes.data.data || []);
        setDiscoveries(disRes.data.data || []);
      } catch (err) {
        console.error("Home fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Stats Data (NO hooks inside map)
  const stats = [
    {
      label: "Great Scientists",
      value: scientists.length || 0,
      suffix: "+",
      desc: "Visionaries who shaped human knowledge",
    },
    {
      label: "Historic Discoveries",
      value: discoveries.length || 0,
      suffix: "+",
      desc: "Ideas that changed the course of science",
    },
    {
      label: "Scientific Fields",
      value: 10,
      suffix: "+",
      desc: "From physics to artificial intelligence",
    },
  ];

  return (
    <div className="bg-slate-950 text-white">

      {/* HERO */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative min-h-[90vh] flex items-center justify-center text-center px-6"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/60" />

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold">
            Every Discovery <br />
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Has a Story
            </span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg">
            Not just results — explore the failures, struggles,
            and breakthroughs behind world-changing ideas.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <GradientButton to="/explore-discovery">
              Explore Stories
            </GradientButton>

            <Link
              to="/timeline"
              className="px-12 py-4 border border-cyan-400 rounded-xl text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
            >
              View Timeline
            </Link>
          </div>
        </div>
      </motion.section>

      {/* STATS */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            {stats.map((item) => (
              <StatCard key={item.label} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SCIENTISTS */}
      <section className="py-28 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold">
            Great Minds Who{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Changed History
            </span>
          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Visionaries whose ideas reshaped science and transformed the world.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading scientists...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
            {scientists.slice(0, 4).map((sci) => (
              <FeaturedCard
                key={sci._id}
                to={`/scientist/${sci._id}`}
                image={`https://ideaoriginbackend.onrender.com${sci.image}`}
                title={sci.name}
                badge={sci.tagline}
                subtitle={sci.field}
                description={sci.description}
                cta="View Profile →"
              />
            ))}
          </div>
        )}
      </section>

      {/* FEATURED DISCOVERIES */}
      <section className="py-28 bg-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold">
            Famous{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Discoveries
            </span>
          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Breakthrough moments that revolutionized knowledge and changed the course of human history.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading discoveries...</p>
        ) : (
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 justify-items-center">
            {discoveries.slice(0, 4).map((d) => (
              <FeaturedCard
                key={d._id}
                to={`/discovery/${d._id}`}
                image={`https://ideaoriginbackend.onrender.com${d.image}`}
                title={d.title}
                subtitle={`${d.scientistId?.name || "Unknown"} • ${d.year || ""}`}
                description={d.shortDescription}
                cta="Read Story →"
              />
            ))}
          </div>
        )}
      </section>

      {/* FINAL CTA */}
      <section className="relative py-36 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Begin Your Journey <br />
            Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Great Ideas
            </span>
          </h2>

          <p className="mt-8 text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Discover science through real stories, the curiosity, the failures,
            and the breakthroughs that changed the world forever.
          </p>

          <div className="mt-12 flex justify-center gap-6 flex-wrap">
            <GradientButton to="/explore-discovery">
              Start Exploring
            </GradientButton>
          </div>
        </div>
      </section>

    </div>
  );
}
