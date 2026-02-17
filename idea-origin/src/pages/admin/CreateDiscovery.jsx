import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateDiscovery() {
  const [scientists, setScientists] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    field: "",
    year: "",
    shortDescription: "",
    scientistId: "",
    image: null,
  });

  // ================= FETCH SCIENTISTS =================
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/scientists")
      .then((res) => setScientists(res.data.data || []))
      .catch(() => toast.error("Failed to load scientists"));
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.scientistId) return toast.error("Select scientist first");

    try {
      setLoading(true);

      const data = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) data.append(key, form[key]);
      });

      await axios.post("http://localhost:5000/api/discoveries", data);

      toast.success("Discovery Created Successfully 🔥");

      setForm({
        title: "",
        field: "",
        year: "",
        shortDescription: "",
        scientistId: "",
        image: null,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-start justify-center p-6">
      
      {/* CARD */}
      <div className="w-full max-w-xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-8">
        
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">
          Create New Discovery
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Discovery Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
          />

          {/* FIELD */}
          <input
            type="text"
            name="field"
            placeholder="Field (Physics, Chemistry...)"
            value={form.field}
            onChange={handleChange}
            required
            className="w-full p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
          />

          {/* YEAR */}
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
            className="w-full p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
          />

          {/* SCIENTIST */}
          <select
            name="scientistId"
            value={form.scientistId}
            onChange={handleChange}
            required
            className="w-full p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="">Select Scientist</option>
            {scientists.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          {/* DESCRIPTION */}
          <textarea
            name="shortDescription"
            placeholder="Short Description"
            value={form.shortDescription}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
          />

          {/* IMAGE */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 bg-slate-800 rounded-lg cursor-pointer"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition-all p-3 rounded-lg font-semibold text-black shadow-lg"
          >
            {loading ? "Creating..." : "Create Discovery"}
          </button>
        </form>
      </div>
    </div>
  );
}
