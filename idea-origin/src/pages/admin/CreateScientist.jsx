// src/pages/admin/CreateScientist.jsx
import React, { useState } from "react";
import axios from "axios";

export default function CreateScientist() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    field: "",
    bio: "",
    tagline: "",
    description: "",
    era: "",
    nationality: "",
    born: "",
    died: "",
    image: null, // file
    story: [],
    impact: [],
    quotes: [],
    funFacts: [],
  });

  const [loading, setLoading] = useState(false);

  // Handle array inputs (comma-separated)
  const handleArrayChange = (key, value) => {
    setForm({ ...form, [key]: value.split(",").map((v) => v.trim()) });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      // Append all fields
      formData.append("name", form.name);
      formData.append("field", form.field);
      formData.append("bio", form.bio);
      formData.append("tagline", form.tagline);
      formData.append("description", form.description);
      formData.append("era", form.era);
      formData.append("nationality", form.nationality);
      formData.append("born", form.born);
      formData.append("died", form.died);

      // Append arrays as JSON strings
      ["story", "impact", "quotes", "funFacts"].forEach((key) => {
        formData.append(key, JSON.stringify(form[key]));
      });

      // Append image if exists
      if (form.image) {
        formData.append("image", form.image);
      }

      await axios.post("http://localhost:5000/api/scientists", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Scientist created successfully!");

      // Reset form
      setForm({
        name: "",
        field: "",
        bio: "",
        tagline: "",
        description: "",
        era: "",
        nationality: "",
        born: "",
        died: "",
        image: null,
        story: [],
        impact: [],
        quotes: [],
        funFacts: [],
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-900 rounded-2xl text-white">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">Create Scientist</h1>

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        {/* Basic Info */}
        {["name", "field", "tagline", "era", "nationality", "born", "died"].map((key) => (
          <div key={key}>
            <label className="block mb-1 text-white/80 capitalize">{key}</label>
            <input
              type="text"
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full p-2 rounded-md border border-white/20 bg-slate-800 text-white"
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}

        {/* Bio and Description */}
        {["bio", "description"].map((key) => (
          <div key={key}>
            <label className="block mb-1 text-white/80 capitalize">{key}</label>
            <textarea
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full p-2 rounded-md border border-white/20 bg-slate-800 text-white"
              placeholder={`Enter ${key}`}
              rows={4}
            />
          </div>
        ))}

        {/* Arrays */}
        {["story", "impact", "quotes", "funFacts"].map((key) => (
          <div key={key}>
            <label className="block mb-1 text-white/80 capitalize">
              {key} (comma-separated)
            </label>
            <textarea
              value={form[key].join(", ")}
              onChange={(e) => handleArrayChange(key, e.target.value)}
              className="w-full p-2 rounded-md border border-white/20 bg-slate-800 text-white"
              placeholder={`Enter ${key} separated by commas`}
              rows={2}
            />
          </div>
        ))}

        {/* Image Upload */}
        <div>
          <label className="block mb-1 text-white/80 capitalize">Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 rounded-md border border-white/20 bg-slate-800 text-white"
            accept="image/*"
          />
          {form.image && <p className="mt-1 text-white/70">Selected: {form.image.name}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 mt-4">
          <button
            type="reset"
            onClick={() =>
              setForm({
                name: "",
                field: "",
                bio: "",
                tagline: "",
                description: "",
                era: "",
                nationality: "",
                born: "",
                died: "",
                image: null,
                story: [],
                impact: [],
                quotes: [],
                funFacts: [],
              })
            }
            className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-cyan-500 rounded-md hover:bg-cyan-400 text-white"
          >
            {loading ? "Creating..." : "Create Scientist"}
          </button>
        </div>
      </form>
    </div>
  );
}
