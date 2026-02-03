import { Link } from "react-router-dom";
import { FeaturedScientists } from "../data/FeaturedScientists";
import { FamousDiscoveries } from "../data/FamousDiscoveries";
import GradientButton from "../components/GradientButton";
import CountUp from "../components/CountUp";
import FeaturedCard from "../components/FeaturedCard";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer } from "../animations/scrollAnimations";

export default function Home() {
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

      {/* VALUE STATS */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">

        <div className="max-w-6xl mx-auto px-6">

          <motion.div
            ref={useRef(null)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center"
          >
            {[
              {
                label: "Great Scientists",
                value: 60,
                suffix: "+",
                desc: "Visionaries who shaped human knowledge",
              },
              {
                label: "Historic Discoveries",
                value: 120,
                suffix: "+",
                desc: "Ideas that changed the course of science",
              },
              {
                label: "Scientific Fields",
                value: 10,
                suffix: "+",
                desc: "From physics to artificial intelligence",
              },
            ].map((item) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true });

              return (
                <div
                  ref={ref}
                  key={item.label}
                  className="group relative bg-slate-900/70 backdrop-blur
                       border border-white/10 rounded-3xl p-10
                       hover:border-cyan-400
                       hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]
                       transition-all duration-300"
                >
                  {/* Glow Accent */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br
                            from-cyan-400/10 to-emerald-400/10
                            opacity-0 group-hover:opacity-100
                            transition" />

                  <div className="relative z-10">
                    <h3 className="text-5xl font-extrabold
                             bg-clip-text text-transparent
                             bg-gradient-to-r from-cyan-400 to-emerald-400">
                      <CountUp value={item.value} start={isInView} />
                      {item.suffix}
                    </h3>

                    <p className="mt-3 text-lg font-semibold text-white">
                      {item.label}
                    </p>

                    <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
          {FeaturedScientists.slice(0, 4).map((sci) => (
            <FeaturedCard
              key={sci.id}
              to={`/scientist/${sci.id}`}
              image={sci.image}
              title={sci.name}
              badge={sci.title}       // 👈 meaningful line
              subtitle={sci.field}
              description={sci.line}
              cta="View Profile →"
            />
          ))}
        </div>

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
            Breakthrough moments that revolutionized knowledge and changed the <br /> course of human history.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 justify-items-center">
          {FamousDiscoveries.slice(0, 4).map((d) => (
            <FeaturedCard
              key={d.id}
              to={`/discovery/${d.id}`}
              image={d.image}
              title={d.title}
              subtitle={`${d.by} • ${d.year}`}
              description={d.description}
              cta="Read Story →"
            />
          ))}
        </div>

      </section>


      {/* FINAL CTA */}
      <section className="relative py-36 text-center overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px]
                  bg-cyan-400/10 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px]
                  bg-emerald-400/10 blur-[160px] rounded-full" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-6">

          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Begin Your Journey <br />
            Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r
                       from-cyan-400 to-emerald-400">
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


    </div >
  );
}
