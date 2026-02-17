import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit } from "lucide-react";
import toast from "react-hot-toast";

export default function Discoveries() {
  const token = localStorage.getItem("token");

  const [discoveries, setDiscoveries] = useState([]);
  const [scientists, setScientists] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    field: "",
    year: "",
    shortDescription: "",
    scientistId: "",
  });

  // ================= FETCH DISCOVERIES =================
  const fetchDiscoveries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/discoveries");
      setDiscoveries(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch discoveries ");
    }
  };

  // ================= FETCH SCIENTISTS =================
  const fetchScientists = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/scientists");
      setScientists(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch scientists ");
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchDiscoveries(), fetchScientists()]).finally(() =>
      setLoading(false)
    );
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this discovery?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/discoveries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDiscoveries((prev) => prev.filter((d) => d._id !== id));
      toast.success("Discovery deleted successfully 🗑️");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed ");
    }
  };

  // ================= OPEN EDIT =================
  const openEdit = (d) => {
    setEditing(d);

    setForm({
      title: d.title || "",
      field: d.field || "",
      year: d.year || "",
      shortDescription: d.shortDescription || "",
      scientistId: d.scientistId?._id || "",
    });
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    if (!form.title || !form.field || !form.scientistId) {
      toast.error("Please fill required fields ");
      return;
    }

    const loadingToast = toast.loading("Updating discovery...");

    try {
      await axios.put(
        `http://localhost:5000/api/discoveries/${editing._id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 🔥 Get fresh populated data
      await fetchDiscoveries();

      setEditing(null);

      toast.success("Discovery updated successfully", {
        id: loadingToast,
      });
    } catch (err) {
      console.error(err);
      toast.error("Update failed ", { id: loadingToast });
    }
  };

  if (loading)
    return <p className="text-white p-6">Loading discoveries...</p>;

  return (
    <div className="p-6 text-white bg-slate-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">Discoveries</h1>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto bg-slate-900 rounded-xl">
        <table className="w-full text-left">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Field</th>
              <th className="p-3">Year</th>
              <th className="p-3">Scientist</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {discoveries.map((d) => (
              <tr key={d._id} className="border-t border-white/10">
                <td className="p-3">{d.title}</td>
                <td className="p-3">{d.field}</td>
                <td className="p-3">{d.year}</td>
                <td className="p-3">{d.scientistId?.name || "—"}</td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => openEdit(d)}
                    className="p-2 bg-cyan-500 rounded hover:bg-cyan-400"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(d._id)}
                    className="p-2 bg-red-500 rounded hover:bg-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-6 rounded-xl w-full max-w-lg space-y-4">
            <h2 className="text-xl font-bold text-cyan-400">
              Update Discovery
            </h2>

            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 bg-slate-800 rounded"
            />

            <input
              type="text"
              placeholder="Field"
              value={form.field}
              onChange={(e) => setForm({ ...form, field: e.target.value })}
              className="w-full p-2 bg-slate-800 rounded"
            />

            <input
              type="number"
              placeholder="Year"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className="w-full p-2 bg-slate-800 rounded"
            />

            {/* Scientist Dropdown */}
            <select
              value={form.scientistId}
              onChange={(e) =>
                setForm({ ...form, scientistId: e.target.value })
              }
              className="w-full p-2 bg-slate-800 rounded"
            >
              <option value="">Select Scientist</option>
              {scientists.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Short Description"
              value={form.shortDescription}
              onChange={(e) =>
                setForm({ ...form, shortDescription: e.target.value })
              }
              className="w-full p-2 bg-slate-800 rounded"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-gray-600 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-cyan-500 rounded hover:bg-cyan-400"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
