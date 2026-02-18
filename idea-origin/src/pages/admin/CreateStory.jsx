import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

/* ================= REUSABLE ARRAY INPUT ================= */
function ArrayInput({ label, values, setValues, placeholder }) {
  const handleChange = (index, value) => {
    const updated = [...values];
    updated[index] = value;
    setValues(updated);
  };

  const addItem = () => setValues([...values, ""]);
  const removeItem = (index) =>
    setValues(values.filter((_, i) => i !== index));

  return (
    <div className="mb-4">
      <h3 className="text-cyan-400 font-semibold mb-2">{label}</h3>

      {values.map((val, idx) => (
        <div key={idx} className="flex gap-2 mb-2">
          <input
            type="text"
            value={val}
            onChange={(e) => handleChange(idx, e.target.value)}
            placeholder={placeholder}
            className="flex-1 p-2 rounded bg-slate-800"
          />
          <button
            type="button"
            onClick={() => removeItem(idx)}
            className="text-red-400"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="text-green-400 text-sm"
      >
        + Add {label}
      </button>
    </div>
  );
}

export default function CreateStory() {
  const [discoveries, setDiscoveries] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    discoveryId: "",
    scientistId: "",
    impact: [""],
    references: [""],
    timeline: [""],
    content: [{ section: "", text: "" }],
  });

  /* ================= FETCH DISCOVERIES ================= */
  const fetchDiscoveries = async () => {
    try {
      const res = await axios.get("https://ideaoriginbackend.onrender.com/api/discoveries");
      setDiscoveries(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load discoveries");
    }
  };

  useEffect(() => {
    fetchDiscoveries();
  }, []);

  /* ================= SELECT DISCOVERY ================= */
  const handleDiscoveryChange = (e) => {
    const selectedId = e.target.value;
    const selected = discoveries.find((d) => d._id === selectedId);

    setForm({
      ...form,
      discoveryId: selectedId,
      scientistId: selected?.scientistId?._id || "",
    });
  };

  /* ================= CONTENT HANDLERS ================= */
  const handleContentChange = (index, field, value) => {
    const updated = [...form.content];
    updated[index][field] = value;
    setForm({ ...form, content: updated });
  };

  const addContentSection = () => {
    setForm({
      ...form,
      content: [...form.content, { section: "", text: "" }],
    });
  };

  const removeContentSection = (index) => {
    const updated = form.content.filter((_, i) => i !== index);
    setForm({ ...form, content: updated });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.discoveryId) {
      return toast.error("Please select discovery");
    }

    try {
      setLoading(true);

      const payload = {
        discoveryId: form.discoveryId,
        scientistId: form.scientistId,
        impact: form.impact.filter(Boolean),
        references: form.references.filter(Boolean),
        timeline: form.timeline.filter(Boolean),
        content: form.content.filter((c) => c.section && c.text),
      };

      await axios.post("https://ideaoriginbackend.onrender.com/api/discovery-stories", payload);

      toast.success("Discovery Story Created ✅");

      /* Reset */
      setForm({
        discoveryId: "",
        scientistId: "",
        impact: [""],
        references: [""],
        timeline: [""],
        content: [{ section: "", text: "" }],
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Discovery Story</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Discovery */}
        <div>
          <label className="block mb-1 text-gray-300">Select Discovery</label>
          <select
            value={form.discoveryId}
            onChange={handleDiscoveryChange}
            className="w-full p-2 rounded bg-slate-800"
          >
            <option value="">-- Select Discovery --</option>
            {discoveries.map((d) => (
              <option key={d._id} value={d._id}>
                {d.title} ({d.year})
              </option>
            ))}
          </select>
        </div>

        {/* Impact */}
        <ArrayInput
          label="Impact"
          values={form.impact}
          setValues={(arr) => setForm({ ...form, impact: arr })}
          placeholder="Enter impact..."
        />

        {/* References */}
        <ArrayInput
          label="References"
          values={form.references}
          setValues={(arr) => setForm({ ...form, references: arr })}
          placeholder="Enter reference..."
        />

        {/* Timeline */}
        <ArrayInput
          label="Timeline"
          values={form.timeline}
          setValues={(arr) => setForm({ ...form, timeline: arr })}
          placeholder="Enter timeline event..."
        />

        {/* CONTENT SECTIONS */}
        <div>
          <h3 className="text-cyan-400 font-semibold mb-2">Story Content</h3>

          {form.content.map((c, index) => (
            <div key={index} className="mb-4 p-3 bg-slate-800 rounded">
              <input
                type="text"
                placeholder="Section title"
                value={c.section}
                onChange={(e) =>
                  handleContentChange(index, "section", e.target.value)
                }
                className="w-full p-2 mb-2 rounded bg-slate-900"
              />

              <textarea
                placeholder="Section text..."
                value={c.text}
                onChange={(e) =>
                  handleContentChange(index, "text", e.target.value)
                }
                rows={3}
                className="w-full p-2 rounded bg-slate-900"
              />

              {form.content.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeContentSection(index)}
                  className="text-red-400 mt-2"
                >
                  Remove Section
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addContentSection}
            className="text-green-400"
          >
            + Add Section
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-cyan-600 rounded text-white"
        >
          {loading ? "Creating..." : "Create Story"}
        </button>
      </form>
    </div>
  );
}
