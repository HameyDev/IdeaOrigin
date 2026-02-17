import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineFilter, HiX } from "react-icons/hi";
import FilterSidebar from "../components/FilterSidebar";

import FeaturedCard from "../components/FeaturedCard";




const scienceFields = [
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics",
  "Astronomy",
  "Cosmology",
  "Computer Science",
  "Artificial Intelligence",
  "Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Materials Science",
  "Medicine",
  "Neuroscience",
  "Psychology",
  "Environmental Science",
  "Earth Science",
  "Energy Science",
  "Nuclear Science",
  "Particle Physics",
  "Quantum Science",
  "Space Exploration",
];

export default function Scientists() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [scientists, setScientists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScientists = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/scientists");

        setScientists(res.data.data); // 👈 because you return { success, data }
        setError(null);
      } catch (err) {
        setError("Failed to load scientists");
      } finally {
        setLoading(false);
      }
    };

    fetchScientists();
  }, []);

  console.log(scientists);


  const itemsPerPage = 9;

  // 🔥 URL STATE
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const selectedFields = searchParams.get("fields")
    ? searchParams.get("fields").split(",")
    : [];

  // 🔥 HELPERS
  const updateParams = (params) => {
    setSearchParams({
      search,
      page,
      fields: selectedFields.join(","),
      ...params,
    });
  };

  const handleFieldCheck = (field) => {
    const updated = selectedFields.includes(field)
      ? selectedFields.filter((f) => f !== field)
      : [...selectedFields, field];

    updateParams({ fields: updated.join(","), page: 1 });
  };

  // 🔍 FILTER LOGIC
  const filtered = scientists.filter((sci) => {
    const matchSearch = sci.name.toLowerCase().includes(search.toLowerCase());
    const matchField =
      selectedFields.length === 0 || selectedFields.includes(sci.field);
    return matchSearch && matchField;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  return (
    <div className="bg-slate-950 text-white min-h-screen px-4 sm:px-6 lg:px-10 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400"
        >
          All Scientists
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-gray-400 max-w-3xl mx-auto"
        >
          Discover the great minds of history.
        </motion.p>
      </div>

      {/* Search + Filter Icon (Mobile) */}
      <div className="flex items-center gap-4 max-w-7xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search scientist..."
          value={search}
          onChange={(e) =>
            updateParams({ search: e.target.value, page: 1 })
          }
          className="flex-1 p-4 rounded-xl bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Filter Icon for Mobile */}
        <button
          className="lg:hidden p-4 bg-slate-900 rounded-xl hover:bg-slate-800 transition"
          onClick={() => setSidebarOpen(true)}
        >
          <HiOutlineFilter className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex gap-8 max-w-7xl mx-auto">
        {/* Desktop Sidebar */}

        <FilterSidebar
          title="Filter by Field"
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        >
          {scienceFields.map((field) => (
            <label key={field} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                value={field}
                checked={selectedFields.includes(field)}
                onChange={() => handleFieldCheck(field)}
                className="accent-cyan-400"
              />
              <span>{field}</span>
            </label>
          ))}

          <button
            onClick={() =>
              setSearchParams({})
            }
            className="mt-4 w-full p-3 rounded-xl bg-gradient-to-r
               from-cyan-500 to-emerald-600
               shadow-lg shadow-emerald-500/30
               hover:scale-105 transition font-medium"
          >
            Clear Filters
          </button>
        </FilterSidebar>



        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* BACKDROP */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
              />

              {/* SIDEBAR */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // ⛔ prevent closing when clicking inside
              >
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="mb-4 p-2 bg-slate-800 rounded-xl hover:bg-slate-700 transition"
                >
                  <HiX className="w-6 h-6 text-white" />
                </button>

                <FilterSidebar
                  title="Filter by Field"
                  isOpen={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                >
                  {scienceFields.map((field) => (
                    <label key={field} className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={selectedFields.includes(field)}
                        onChange={() => handleFieldCheck(field)}
                        className="accent-cyan-400"
                      />
                      <span>{field}</span>
                    </label>
                  ))}

                  <button
                    onClick={() => {
                      setSearchParams({});
                      setSidebarOpen(false);
                    }}
                    className="mt-4 w-full p-3 rounded-xl bg-gradient-to-r
              from-cyan-500 to-emerald-600
              shadow-lg shadow-emerald-500/30
              hover:scale-105 transition font-medium"
                  >
                    Clear Filters
                  </button>
                </FilterSidebar>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {loading && (
          <p className="text-center text-gray-400 mt-20">
            Loading scientists...
          </p>
        )}

        {error && (
          <p className="text-center text-red-400 mt-20">
            {error}
          </p>
        )}

{!loading && !error && (
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={page} // 🔥 THIS IS THE MAGIC
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3
                 gap-12 min-h-[800px] items-start justify-items-center"
            >

              {paginated.length === 0 && (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full text-center text-gray-400 mt-10"
                >
                  No scientists found.
                </motion.p>
              )}

              {paginated.map((sci) => (
                <FeaturedCard
                  key={sci.id}
                  to={`/scientist/${sci._id}`}
                  image={`http://localhost:5000${sci.image}`}
                  title={sci.name}
                  subtitle={sci.field}
                  description={sci.description || "Explore the life, discoveries, and legacy of this scientist."}
                  cta="View Profile →"
                />
              ))}


            </motion.div>
          </AnimatePresence>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-8">
              <button
                disabled={page === 1}
                onClick={() => updateParams({ page: page - 1 })}
                className="px-6 py-2 rounded-xl border border-white/30 disabled:opacity-40 hover:bg-white hover:text-black transition"
              >
                Prev
              </button>
              <span className="text-gray-300">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => updateParams({ page: page + 1 })}
                className="px-6 py-2 rounded-xl border border-white/30 disabled:opacity-40 hover:bg-white hover:text-black transition"
              >
                Next
              </button>
            </div>
          )}
        </main>
        )}
      </div>
    </div>
  );
}
