import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { discoveries } from "../data/Discoveries";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineFilter } from "react-icons/hi";
import FilterSidebar from "../components/FilterSidebar";

import FeaturedCard from "../components/FeaturedCard";

/* =======================
   SCIENCE FIELDS
======================= */
const fields = [
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

/* =======================
   YEAR RANGES
======================= */
const yearRanges = {
  all: [0, 3000],
  "1500-1700": [1500, 1700],
  "1701-1800": [1701, 1800],
  "1801-1900": [1801, 1900],
  "1901-1950": [1901, 1950],
  "1951-2000": [1951, 2000],
};

export default function Explore() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  /* =======================
     URL STATE
  ======================= */
  const search = searchParams.get("search") || "";
  const yearRange = searchParams.get("year") || "all";
  const page = Number(searchParams.get("page")) || 1;

  const selectedFields = searchParams.get("fields")
    ? searchParams.get("fields").split(",")
    : [];

  const [minYear, maxYear] = yearRanges[yearRange];

  /* =======================
     UPDATE PARAMS
  ======================= */
  const updateParams = (params) => {
    setSearchParams({
      search,
      year: yearRange,
      page,
      fields: selectedFields.join(","),
      ...params,
    });
  };

  /* =======================
     FIELD TOGGLE
  ======================= */
  const toggleField = (field) => {
    const updated = selectedFields.includes(field)
      ? selectedFields.filter((f) => f !== field)
      : [...selectedFields, field];

    updateParams({ fields: updated.join(","), page: 1 });
  };

  /* =======================
     FILTER LOGIC
  ======================= */
  const filtered = discoveries.filter((d) => {
    const matchSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.scientist.toLowerCase().includes(search.toLowerCase());

    const matchField =
      selectedFields.length === 0 || selectedFields.includes(d.field);

    const matchYear = d.year >= minYear && d.year <= maxYear;

    return matchSearch && matchField && matchYear;
  });

  /* =======================
     PAGINATION
  ======================= */
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  return (
    <div className="bg-gradient-to-b from-black via-[#14132A] to-black text-white min-h-screen px-4 lg:px-10 py-10">

      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400"
        >
          Explore Discoveries
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-gray-400 max-w-3xl mx-auto"
        >
          Browse scientific discoveries by field and historical period.
        </motion.p>
      </div>


      {/* ================= SEARCH ================= */}
      <div className="flex gap-4 max-w-7xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by discovery or scientist..."
          value={search}
          onChange={(e) =>
            updateParams({ search: e.target.value, page: 1 })
          }
          className="flex-1 p-4 rounded-xl bg-slate-800 outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <button
          className="lg:hidden p-4 bg-slate-900 rounded-xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <HiOutlineFilter className="w-6 h-6" />
        </button>
      </div>

      <div className="flex gap-8 max-w-7xl mx-auto">

        {/* ================= SIDEBAR ================= */}
        <FilterSidebar
          title="Filters"
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        >
          <p className="text-sm text-gray-400 mb-2">Fields</p>

          <div className="space-y-2 mb-6">
            {fields.map((f) => (
              <label key={f} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedFields.includes(f)}
                  onChange={() => toggleField(f)}
                  className="accent-cyan-400"
                />
                {f}
              </label>
            ))}
          </div>

          <label className="block mb-6">
            <span className="text-sm text-gray-400">Year</span>
            <select
              value={yearRange}
              onChange={(e) =>
                updateParams({ year: e.target.value, page: 1 })
              }
              className="w-full mt-1 p-2 rounded-xl bg-slate-800"
            >
              <option value="all">All</option>
              {Object.keys(yearRanges)
                .filter((y) => y !== "all")
                .map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
            </select>
          </label>

          <button
            onClick={() => {
              setSearchParams({});
              setSidebarOpen(false);
            }}
            className="w-full p-3 rounded-xl bg-gradient-to-r
              from-cyan-500 to-emerald-600
              shadow-lg shadow-emerald-500/30
              hover:scale-105 transition"
          >
            Clear Filters
          </button>
        </FilterSidebar>

        {/* ================= GRID ================= */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center"
            >
              {paginated.map((sci) => (
                <FeaturedCard
                  key={sci.id}
                  to={`/discovery/${sci.id}`}
                  image={sci.image}
                  title={sci.title}
                  subtitle={sci.field}
                  description={sci.desc}
                  cta="View Profile →"
                />
              ))}

            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="flex justify-center gap-6 mt-16">
              <button
                disabled={page === 1}
                onClick={() => updateParams({ page: page - 1 })}
                className="px-6 py-2 rounded-xl border disabled:opacity-40"
              >
                Prev
              </button>

              <span className="text-gray-400">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => updateParams({ page: page + 1 })}
                className="px-6 py-2 rounded-xl border disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
