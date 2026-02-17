import { useState, useEffect } from "react";
import axios from "axios";
import EditScientistModal from "../../components/admin/EditScientistModal";
import { Trash2, Edit } from "lucide-react";

const Scientists = () => {
    const [scientists, setScientists] = useState([]);
    const [loading, setLoading] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingScientist, setEditingScientist] = useState(null);

    const token = localStorage.getItem("token");

    // Fetch all scientists
    const fetchScientists = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/api/scientists", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setScientists(res.data.data || []);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch scientists");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScientists();
    }, []);

    // Delete scientist
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this scientist?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/scientists/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setScientists(scientists.filter((s) => s._id !== id));
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Delete failed");
        }
    };

    // Open modal for editing
    const openEditModal = (scientist) => {
        setEditingScientist(scientist);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingScientist(null);
    };

    const saveEdit = async (updatedScientist) => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/scientists/${updatedScientist._id}`,
                updatedScientist,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setScientists(
                scientists.map((s) =>
                    s._id === updatedScientist._id ? (res.data.scientist || updatedScientist) : s
                )
            );

            alert("Scientist updated successfully!");
            closeModal(); // ✅ call modal close here
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Update failed");
        }
    };



    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-cyan-400">Scientists</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-800 text-cyan-400">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Field</th>
                                <th className="p-4">Bio</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scientists.map((sci) => (
                                <tr key={sci._id} className="border-t border-white/5">
                                    <td className="p-4">{sci.name}</td>
                                    <td className="p-4">{sci.field}</td>
                                    <td className="p-4">{sci.bio}</td>
                                    <td className="p-4 text-right space-x-3">
                                        <button
                                            className="text-yellow-400"
                                            onClick={() => openEditModal(sci)}
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            className="text-red-400"
                                            onClick={() => handleDelete(sci._id)}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {modalOpen && editingScientist && (
                <EditScientistModal
                    scientist={editingScientist}
                    onClose={closeModal}
                    onSave={saveEdit}
                />
            )}
        </div>
    );
};

export default Scientists;
