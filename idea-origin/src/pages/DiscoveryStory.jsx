import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DiscoveryStory() {
  const { id } = useParams(); // discoveryId from URL
  const [discovery, setDiscovery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDiscoveryStory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://ideaoriginbackend.onrender.com/api/discovery-stories/by-discovery/${id}`
        );
        setDiscovery(res.data.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load discovery story");
      } finally {
        setLoading(false);
      }
    };

    fetchDiscoveryStory();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-b from-black via-[#14132A] to-black px-4">
        <h2 className="text-2xl sm:text-3xl">Loading...</h2>
      </div>
    );
  }

  if (error || !discovery) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-b from-black via-[#14132A] to-black px-4">
        <h2 className="text-2xl sm:text-3xl">{error || "Discovery story not found"}</h2>
      </div>
    );
  }

  const { discoveryId: disc, scientistId, content, impact, references, timeline, image } = discovery;

  return (
    <div className="bg-gradient-to-b from-black via-[#14132A] to-black text-white min-h-screen px-4 sm:px-6 lg:px-12">
      
      {/* HEADER */}
      <section className="py-16 sm:py-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
          {disc.title}
        </h1>
        <p className="mt-3 text-gray-400 text-sm sm:text-base md:text-lg">
          {scientistId.name} • {disc.year}
        </p>
      </section>

      {/* STORY CONTENT */}
      <section className="max-w-5xl mx-auto pb-24 space-y-8">
        <div className="bg-slate-900/70 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10">

          {/* IMAGE */}
          {image && (
            <div className="h-48 sm:h-64 w-full rounded-2xl overflow-hidden mb-8 shadow-lg border border-white/10">
              <img
                src={`https://ideaoriginbackend.onrender.com${image}`}
                alt={disc.title}
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Story Sections */}
          {content.map((section, index) => (
            <div key={index} className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 mb-2">
                {section.section}
              </h2>
              <p className="text-gray-300 text-sm sm:text-base md:text-base leading-relaxed whitespace-pre-line">
                {section.text}
              </p>
            </div>
          ))}

          {/* IMPACT */}
          {impact?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">Impact</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {impact.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* REFERENCES */}
          {references?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">References</h2>
              <ul className="list-decimal list-inside text-gray-300 space-y-1">
                {references.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* TIMELINE */}
          {timeline?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">Timeline</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {timeline.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* FOOTER BUTTONS */}
          <div className="mt-12 flex flex-col sm:flex-row flex-wrap gap-4">
            <Link
              to={`/scientist/${scientistId._id}`}
              className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl text-center text-white font-medium shadow-lg hover:scale-105 transition transform"
            >
              About {scientistId.name}
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
