import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddDiscovery() {
  const [formData, setFormData] = useState({
    title: "",
    scientist: "",
    scientistId: "",
    year: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send formData to backend API
    console.log("New Discovery:", formData);
    alert("Discovery added! (UI only)");
    setFormData({
      title: "",
      scientist: "",
      scientistId: "",
      year: "",
      description: "",
    });
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen px-4 sm:px-6 lg:px-10 py-8 sm:py-10">

      {/* HEADER */}
      <div className="mb-8 sm:mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Add New Discovery</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Fill in the details below to add a discovery.
        </p>
        <Link
          to="/admin"
          className="inline-block mt-2 text-indigo-400 hover:text-indigo-300 text-sm sm:text-base"
        >
          ← Back to Admin Panel
        </Link>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 rounded-2xl p-6 sm:p-8 md:p-10 max-w-3xl mx-auto space-y-5 sm:space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">
            Discovery Title
          </label>
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
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">
            Scientist Name
          </label>
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
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">
            Scientist ID (for URL)
          </label>
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
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">
            Year
          </label>
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
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">
            Description / Story
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="6"
            className="w-full p-3 sm:p-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-indigo-700 transition"
        >
          Add Discovery
        </button>
      </form>
    </div>
  );
}
