import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function EditScientist() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data (replace with API fetch later)
  const scientists = [
    { id: "einstein", name: "Albert Einstein", field: "Physics", born: 1879, died: 1955, bio: "Developed the theory of relativity." },
    { id: "tesla", name: "Nikola Tesla", field: "Physics", born: 1856, died: 1943, bio: "Pioneer of AC electricity." },
    { id: "newton", name: "Isaac Newton", field: "Physics", born: 1643, died: 1727, bio: "Formulated laws of motion and gravity." },
  ];

  const [formData, setFormData] = useState({
    name: "",
    field: "",
    born: "",
    died: "",
    bio: "",
    id: "",
  });

  useEffect(() => {
    const scientist = scientists.find((s) => s.id === id);
    if (scientist) {
      setFormData(scientist);
    } else {
      alert("Scientist not found!");
      navigate("/admin");
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
    console.log("Updated Scientist:", formData);
    alert("Scientist updated! (UI only)");
    navigate("/admin");
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen px-4 sm:px-6 lg:px-10 py-10">

      {/* HEADER */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">Edit Scientist</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Update the scientist's profile details below.
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
        className="bg-slate-900 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6 shadow-lg"
      >
        {/* Name */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">Full Name</label>
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
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">Field</label>
          <input
            type="text"
            name="field"
            value={formData.field}
            onChange={handleChange}
            required
            className="w-full p-3 sm:p-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />
        </div>

        {/* Born */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">Born Year</label>
          <input
            type="number"
            name="born"
            value={formData.born}
            onChange={handleChange}
            required
            className="w-full p-3 sm:p-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />
        </div>

        {/* Died */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">Died Year (leave blank if alive)</label>
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
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">Scientist ID (for URL)</label>
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
          <label className="block mb-2 text-gray-300 font-medium text-sm sm:text-base">Short Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
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
          Update Scientist
        </button>
      </form>
    </div>
  );
}
