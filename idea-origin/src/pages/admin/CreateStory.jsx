import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateStory() {
  const [discoveries, setDiscoveries] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    discoveryId: "",
    scientistId: "",
    impact: "",
    references: "",
    timeline: "",
    content: [{ section: "", text: "" }],
  });

  // ================= FETCH DISCOVERIES =================
  const fetchDiscoveries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/discoveries");
      setDiscoveries(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load discoveries");
    }
  };

  useEffect(() => {
    fetchDiscoveries();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // When discovery selected → auto set scientistId
  const handleDiscoveryChange = (e) => {
    const selectedId = e.target.value;
    const selectedDiscovery = discoveries.find(d => d._id === selectedId);

    setForm({
      ...form,
      discoveryId: selectedId,
      scientistId: selectedDiscovery?.scientistId?._id || "",
    });
  };

  // ================= CONTENT SECTION =================
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

  // ================= CREATE STORY =================
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
        impact: form.impact.split(",").map(s => s.trim()).filter(Boolean),
        references: form.references.split(",").map(s => s.trim()).filter(Boolean),
        timeline: form.timeline.split(",").map(s => s.trim()).filter(Boolean),
        content: form.content.filter(c => c.section && c.text),
      };

      await axios.post("http://localhost:5000/api/discovery-stories", payload);

      toast.success("Discovery Story Created ✅");

      // Reset form
      setForm({
        discoveryId: "",
        scientistId: "",
        impact: "",
        references: "",
        timeline: "",
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

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Discovery Dropdown */}
        <div>
          <label className="block mb-1 text-gray-300">Select Discovery</label>
          <select
            name="discoveryId"
            value={form.discoveryId}
            onChange={handleDiscoveryChange}
            className="w-full p-2 rounded bg-slate-800"
          >
            <option value="">-- Select Discovery --</option>
            {discoveries.map(d => (
              <option key={d._id} value={d._id}>
                {d.title} ({d.year})
              </option>
            ))}
          </select>
        </div>

        {/* Impact */}
        <div>
          <label className="block mb-1 text-gray-300">Impact (comma separated)</label>
          <input
            type="text"
            name="impact"
            value={form.impact}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800"
          />
        </div>

        {/* References */}
        <div>
          <label className="block mb-1 text-gray-300">References (comma separated)</label>
          <input
            type="text"
            name="references"
            value={form.references}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800"
          />
        </div>

        {/* Timeline */}
        <div>
          <label className="block mb-1 text-gray-300">Timeline (comma separated)</label>
          <input
            type="text"
            name="timeline"
            value={form.timeline}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800"
          />
        </div>

        {/* Content Sections */}
        <div>
          <label className="block mb-2 text-gray-300">Story Content</label>

          {form.content.map((c, index) => (
            <div key={index} className="mb-4 p-3 bg-slate-800 rounded">
              <input
                type="text"
                placeholder="Section title (e.g. Introduction)"
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
                  className="mt-2 text-red-400"
                >
                  Remove Section
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addContentSection}
            className="text-cyan-400"
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
