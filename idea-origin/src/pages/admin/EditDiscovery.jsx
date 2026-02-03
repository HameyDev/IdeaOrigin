import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function EditDiscovery() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data (replace with API later)
  const discoveries = [
    { id: "relativity", title: "Theory of Relativity", scientist: "Albert Einstein", scientistId: "einstein", year: 1905, description: "Changed how we see time and space." },
    { id: "gravity", title: "Law of Gravity", scientist: "Isaac Newton", scientistId: "newton", year: 1687, description: "Explains the motion of objects." },
    { id: "ac", title: "AC Electricity", scientist: "Nikola Tesla", scientistId: "tesla", year: 1890, description: "Brought alternating current to the world." },
  ];

  const [formData, setFormData] = useState({
    title: "",
    scientist: "",
    scientistId: "",
    year: "",
    description: "",
  });

  // Pre-fill form with discovery data
  useEffect(() => {
    const discovery = discoveries.find((d) => d.id === id);
    if (discovery) {
      setFormData(discovery);
    } else {
      alert("Discovery not found!");
      navigate("/admin/stories");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Discovery:", formData);
    alert("Discovery updated! (UI only)");
    navigate("/admin/stories");
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen px-4 sm:px-6 lg:px-10 py-10">

      {/* HEADER */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">Edit Discovery</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Update the details of the discovery below.
        </p>
        <Link
          to="/admin/stories"
          className="inline-block mt-2 text-indigo-400 hover:text-indigo-300 text-sm sm:text-base"
        >
          ← Back to Discoveries
        </Link>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6 shadow-lg"
      >
        {/* Title */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 sm:p-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />
        </div>

        {/* Scientist */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">Scientist Name</label>
          <input
            type="text"
            name="scientist"
            value={formData.scientist}
            onChange={handleChange}
            required
            className="w-full p-3 sm:p-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />
        </div>

        {/* Scientist ID */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">Scientist ID (for URL)</label>
          <input
            type="text"
            name="scientistId"
            value={formData.scientistId}
            onChange={handleChange}
            required
            className="w-full p-3 sm:p-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />
        </div>

        {/* Year */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="w-full p-3 sm:p-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            className="w-full p-3 sm:p-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 py-3 sm:py-4 rounded-xl font-semibold hover:bg-indigo-700 transition text-sm sm:text-base"
        >
          Update Discovery
        </button>
      </form>
    </div>
  );
}
