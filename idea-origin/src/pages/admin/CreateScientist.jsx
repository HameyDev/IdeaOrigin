// src/pages/admin/CreateScientist.jsx
import React, { useState } from "react";
import axios from "axios";

// Reusable dynamic array input component
function ArrayInput({ label, values, setValues }) {
  const handleChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const addItem = () => setValues([...values, ""]);
  const removeItem = (index) => setValues(values.filter((_, i) => i !== index));

  return (
    <div className="mb-4">
      <h3 className="font-semibold text-cyan-400 mb-2">{label}</h3>
      {values.map((val, idx) => (
        <div key={idx} className="flex items-center mb-2">
          <input
            type="text"
            value={val}
            onChange={(e) => handleChange(idx, e.target.value)}
            className="flex-1 p-2 rounded border border-gray-500 text-black"
            placeholder={`Enter ${label} item`}
          />
          <button
            type="button"
            onClick={() => removeItem(idx)}
            className="ml-2 text-red-500 font-bold"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="text-green-500 font-bold mt-1"
      >
        + Add {label}
      </button>
    </div>
  );
}

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
    image: null,
    story: [""],
    impact: [""],
    quotes: [""],
    funFacts: [""],
  });

  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();

      // Append simple fields
      ["name","field","bio","tagline","description","era","nationality","born","died"].forEach(key => {
        formData.append(key, form[key]);
      });

      // Append arrays properly
      ["story", "impact", "quotes", "funFacts"].forEach(key => {
        formData.append(key, JSON.stringify(form[key]));
      });

      // Append image if selected
      if (form.image) formData.append("image", form.image);

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
        story: [""],
        impact: [""],
        quotes: [""],
        funFacts: [""],
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
        {["name", "field", "tagline", "era", "nationality", "born", "died"].map(key => (
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

        {/* Bio & Description */}
        {["bio", "description"].map(key => (
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

        {/* Dynamic Array Inputs */}
        <ArrayInput label="Story" values={form.story} setValues={(arr) => setForm({...form, story: arr})} />
        <ArrayInput label="Impact" values={form.impact} setValues={(arr) => setForm({...form, impact: arr})} />
        <ArrayInput label="Quotes" values={form.quotes} setValues={(arr) => setForm({...form, quotes: arr})} />
        <ArrayInput label="Fun Facts" values={form.funFacts} setValues={(arr) => setForm({...form, funFacts: arr})} />

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
                story: [""],
                impact: [""],
                quotes: [""],
                funFacts: [""],
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
