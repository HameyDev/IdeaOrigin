import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddScientist() {
  const [formData, setFormData] = useState({
    name: "",
    field: "",
    born: "",
    died: "",
    bio: "",
    id: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Scientist:", formData);
    alert("Scientist added! (UI only)");
    setFormData({
      name: "",
      field: "",
      born: "",
      died: "",
      bio: "",
      id: "",
    });
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen px-4 sm:px-6 lg:px-10 py-8 sm:py-10">

      {/* HEADER */}
      <div className="mb-8 sm:mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Add New Scientist</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Fill in the details below to add a scientist profile.
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
        {/* Name */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 sm:p-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />
        </div>

        {/* Field */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">
            Field (Physics, Chemistry, etc.)
          </label>
          <input
            type="text"
            name="field"
            value={formData.field}
            onChange={handleChange}
            required
            className="w-full p-3 sm:p-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />
        </div>

        {/* Born Year */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">
            Born Year
          </label>
          <input
            type="number"
            name="born"
            value={formData.born}
            onChange={handleChange}
            required
            className="w-full p-3 sm:p-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />
        </div>

        {/* Died Year */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">
            Died Year (leave blank if still alive)
          </label>
          <input
            type="number"
            name="died"
            value={formData.died}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />
        </div>

        {/* Scientist ID */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">
            Scientist ID (for URL, e.g., 'einstein')
          </label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            className="w-full p-3 sm:p-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">
            Short Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
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
          Add Scientist
        </button>
      </form>
    </div>
  );
}
