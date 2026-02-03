import { Link } from "react-router-dom";
import { timelineData } from "../data/timelineData";
import { motion } from "framer-motion";

export default function Timeline() {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-[#0f0f22] to-slate-950 text-white min-h-screen">

      {/* Header */}
      <section className="py-20 text-center px-6 sm:px-12 lg:px-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
          Discovery Timeline
        </h1>
        <p className="mt-4 text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
          Walk through history and explore the breakthroughs that shaped our world.
        </p>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-0 pb-32 relative">
        <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-6">

          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="mb-16 relative flex flex-col sm:flex-row items-start sm:items-center justify-start"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-5 sm:-left-6 top-0 w-5 h-5 bg-cyan-500 rounded-full shadow-lg animate-pulse"></div>

              {/* Timeline Card */}
              <div
                className={`bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300
                  w-full sm:min-w-[280px] sm:flex-1
                  ${index % 2 === 0 ? "sm:ml-8" : "sm:ml-12 sm:translate-x-6"}`}
              >
                <span className="text-cyan-400 font-semibold text-sm sm:text-base">
                  {item.year}
                </span>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 text-white">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm sm:text-base mt-1">
                  {item.scientist}
                </p>

                <p className="text-gray-300 text-sm sm:text-base mt-4 leading-relaxed">
                  {item.desc}
                </p>

                <Link
                  to={`/discovery/${item.id}`}
                  className="inline-block mt-5 text-cyan-400 hover:text-emerald-400 font-medium transition-colors"
                >
                  Read Story →
                </Link>
              </div>
            </motion.div>
          ))}

        </div>
      </section>
    </div>
  );
}
