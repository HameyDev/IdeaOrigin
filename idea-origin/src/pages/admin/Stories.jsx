// pages/admin/Stories.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editStory, setEditStory] = useState(null);

  // Form state for editing
  const [form, setForm] = useState({
    impact: "",
    references: "",
    timeline: "",
    content: "",
  });

  // ================= FETCH STORIES =================
  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/discovery-stories");
      // ensure discoveryId and scientistId are populated
      setStories(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch stories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  // ================= EDIT =================
  const handleEditClick = (story) => {
    // safe check: if discoveryId or content is null, set defaults
    const impact = story.impact || [];
    const references = story.references || [];
    const timeline = story.timeline || [];
    const content = story.content || [];

    setEditStory(story);
    setForm({
      impact: impact.join(", "),
      references: references.join(", "),
      timeline: timeline.join(", "),
      content: content.map(c => `${c.section}: ${c.text}`).join("\n"),
    });
    setModalOpen(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!editStory) return;
    try {
      const payload = {
        impact: form.impact.split(",").map(s => s.trim()),
        references: form.references.split(",").map(s => s.trim()),
        timeline: form.timeline.split(",").map(s => s.trim()),
        content: form.content.split("\n").map(line => {
          const [section, ...textParts] = line.split(":");
          return { section: section?.trim() || "", text: textParts.join(":").trim() || "" };
        }),
      };

      await axios.put(
        `http://localhost:5000/api/discovery-stories/${editStory._id}`,
        payload
      );

      toast.success("Story updated successfully");
      setModalOpen(false);
      setEditStory(null);
      fetchStories();
    } catch (err) {
      toast.error("Failed to update story");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/discovery-stories/${id}`);
      toast.success("Story deleted successfully");
      fetchStories();
    } catch (err) {
      toast.error("Failed to delete story");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Discovery Stories</h1>

      {/* ================= STORIES TABLE ================= */}
      <div className="overflow-x-auto rounded-lg bg-slate-900">
        <table className="w-full text-left">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-3">Discovery</th>
              <th className="p-3">Scientist</th>
              <th className="p-3">Impact</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : stories.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-400">
                  No stories found.
                </td>
              </tr>
            ) : (
              stories.map((s) => (
                <tr key={s._id} className="border-b border-slate-700">
                  <td className="p-3">{s.discoveryId?.title || "Unknown"}</td>
                  <td className="p-3">{s.scientistId?.name || "Unknown"}</td>
                  <td className="p-3">{(s.impact || []).join(", ")}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEditClick(s)}
                      className="px-3 py-1 bg-yellow-500 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="px-3 py-1 bg-red-600 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {modalOpen && editStory && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-xl p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">
              Edit Story: {editStory.discoveryId?.title || "Unknown"}
            </h2>

            <div className="space-y-4">
              <label>
                <span className="text-gray-300">Impact (comma separated)</span>
                <input
                  type="text"
                  name="impact"
                  value={form.impact}
                  onChange={handleFormChange}
                  className="w-full p-2 rounded-lg bg-slate-800 outline-none"
                />
              </label>

              <label>
                <span className="text-gray-300">References (comma separated)</span>
                <input
                  type="text"
                  name="references"
                  value={form.references}
                  onChange={handleFormChange}
                  className="w-full p-2 rounded-lg bg-slate-800 outline-none"
                />
              </label>

              <label>
                <span className="text-gray-300">Timeline (comma separated)</span>
                <input
                  type="text"
                  name="timeline"
                  value={form.timeline}
                  onChange={handleFormChange}
                  className="w-full p-2 rounded-lg bg-slate-800 outline-none"
                />
              </label>

              <label>
                <span className="text-gray-300">
                  Content (one section per line: Section: Text)
                </span>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleFormChange}
                  rows={6}
                  className="w-full p-2 rounded-lg bg-slate-800 outline-none"
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-cyan-500 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
