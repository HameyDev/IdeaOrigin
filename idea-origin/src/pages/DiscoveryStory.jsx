import { useParams, Link } from "react-router-dom";
import { discoveryStories } from "../data/DiscoveryStories";

export default function DiscoveryStory() {
  const { id } = useParams();

  

  const discovery = discoveryStories[id];

  if (!discovery) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-b from-black via-[#14132A] to-black px-4">
        <h2 className="text-2xl sm:text-3xl">Discovery not found</h2>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-black via-[#14132A] to-black text-white min-h-screen px-4 sm:px-6 lg:px-12">

      <section className="py-16 sm:py-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
          {discovery.title}
        </h1>
        <p className="mt-3 text-gray-400 text-sm sm:text-base md:text-lg">
          {discovery.scientist} • {discovery.year}
        </p>
      </section>

      <section className="max-w-5xl mx-auto pb-24 space-y-8">

        <div className="bg-slate-900/70 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10">

          <div className="h-48 sm:h-64 w-full rounded-2xl overflow-hidden mb-8 shadow-lg border border-white/10">
            <img
              src={discovery.image}
              alt={discovery.title}
              className="w-full h-full object-cover"
            />
          </div>

          {discovery.content.map((section, index) => (
            <div key={index} className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 mb-2">
                {section.section}
              </h2>
              <p className="text-gray-300 text-sm sm:text-base md:text-base leading-relaxed whitespace-pre-line">
                {section.text}
              </p>
            </div>
          ))}


          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-4">
            <Link
              to={`/scientist/${discovery.scientistId}`}
              className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl text-center text-white font-medium shadow-lg hover:scale-105 transition transform"
            >
              About {discovery.scientist}
            </Link>

            <Link
              to="/explore-discovery"
              className="px-5 py-3 border border-white/30 rounded-xl text-center text-white font-medium hover:bg-white hover:text-black transition"
            >
              Back to Explore
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}