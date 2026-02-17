import { useState, useEffect } from "react";
import axios from "axios";
import { Users, Atom, FlaskConical, BookOpen, Trash2, Edit } from "lucide-react";

export default function Admin() {
    const [activeTab, setActiveTab] = useState("users");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [editName, setEditName] = useState("");
    const [editRole, setEditRole] = useState("");
    const [scientists, setScientists] = useState([]);
    const [loadingScientists, setLoadingScientists] = useState(false);

    const [scientistForm, setScientistForm] = useState({
        name: "",
        field: "",
        image: "",
        tagline: "",
        description: "",
        era: "",
        nationality: "",
        born: "",
        died: "",
        bio: "",
        story: "",
        impact: "",
        quotes: "",
        funFacts: "",
    });


    const [editingScientist, setEditingScientist] = useState(null);

    const token = localStorage.getItem("token"); // Admin token

    const tabs = [
        { id: "users", label: "Users", icon: Users },
        { id: "scientists", label: "Scientists", icon: Atom },
        { id: "discoveries", label: "Discoveries", icon: FlaskConical },
        { id: "stories", label: "Stories", icon: BookOpen },
    ];

    // ================= FETCH USERS =================
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/api/auth/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data.users);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const fetchScientists = async () => {
        try {
            setLoadingScientists(true);
            const res = await axios.get("http://localhost:5000/api/scientists");
            setScientists(res.data.data);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch scientists");
        } finally {
            setLoadingScientists(false);
        }
    };


    useEffect(() => {
        if (activeTab === "users") fetchUsers();
        if (activeTab === "scientists") fetchScientists();
    }, [activeTab]);

    // ================= DELETE USER =================
    const handleDeleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/auth/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(users.filter((u) => u._id !== id));
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Delete failed");
        }
    };

    // ================= EDIT USER =================
    const startEditing = (user) => {
        setEditingUser(user._id);
        setEditName(user.name);
        setEditRole(user.role);
    };

    const cancelEditing = () => {
        setEditingUser(null);
        setEditName("");
        setEditRole("");
    };

    const saveUserEdit = async () => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/auth/users/${editingUser}`,
                { name: editName, role: editRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUsers(users.map((u) => (u._id === editingUser ? res.data.user : u)));
            cancelEditing();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Update failed");
        }
    };

    const handleScientistChange = (e) => {
        setScientistForm({
            ...scientistForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleScientistSubmit = async () => {
        try {
            if (!scientistForm.name) return alert("Name required");

            const payload = {
                ...scientistForm,
                story: scientistForm.story.split("\n"),
                impact: scientistForm.impact.split("\n"),
                quotes: scientistForm.quotes.split("\n"),
                funFacts: scientistForm.funFacts.split("\n"),
            };

            if (editingScientist) {
                const res = await axios.put(
                    `http://localhost:5000/api/scientists/${editingScientist}`,
                    payload
                );

                setScientists(scientists.map((s) =>
                    s._id === editingScientist ? res.data.data : s
                ));

                alert("Scientist updated");
            } else {
                const res = await axios.post(
                    "http://localhost:5000/api/scientists",
                    payload
                );

                setScientists([...scientists, res.data.data]);
                alert("Scientist created");
            }

            // Reset form
            setScientistForm({
                name: "",
                field: "",
                image: "",
                tagline: "",
                description: "",
                era: "",
                nationality: "",
                born: "",
                died: "",
                bio: "",
                story: "",
                impact: "",
                quotes: "",
                funFacts: "",
            });
            setEditingScientist(null);
        } catch (err) {
            console.error(err);
            alert("Save failed");
        }
    };


    const handleDeleteScientist = async (id) => {
        if (!window.confirm("Delete this scientist?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/scientists/${id}`);
            setScientists(scientists.filter((s) => s._id !== id));
        } catch (err) {
            console.error(err);
            alert("Delete failed");
        }
    };

    const startEditScientist = (s) => {
        setEditingScientist(s._id);
        setScientistForm({
            name: s.name || "",
            field: s.field || "",
            image: s.image || "",
            tagline: s.tagline || "",
            description: s.description || "",
            era: s.era || "",
            nationality: s.nationality || "",
            born: s.born || "",
            died: s.died || "",
            bio: s.bio || "",
            story: (s.story || []).join("\n"),
            impact: (s.impact || []).join("\n"),
            quotes: (s.quotes || []).join("\n"),
            funFacts: (s.funFacts || []).join("\n"),
        });
    };






    return (
        <div className="min-h-screen bg-slate-950 text-white flex">

            {/* ================= SIDEBAR ================= */}
            <aside className="w-64 bg-slate-900 border-r border-white/10 p-6 hidden sm:flex flex-col">
                <h2 className="text-2xl font-bold mb-10 text-cyan-400">Admin Panel</h2>

                <nav className="space-y-3">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${activeTab === tab.id
                                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/30"
                                        : "text-gray-300 hover:bg-white/5"
                                    }`}
                            >
                                <Icon size={18} />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* ================= MAIN ================= */}
            <main className="flex-1 p-6 sm:p-10">

                {/* ================= USERS ================= */}
                {activeTab === "users" && (
                    <section>
                        <h1 className="text-3xl font-bold mb-6">Users</h1>

                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-800 text-cyan-400">
                                        <tr>
                                            <th className="p-4">Name</th>
                                            <th className="p-4">Email</th>
                                            <th className="p-4">Role</th>
                                            <th className="p-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user._id} className="border-t border-white/5">
                                                <td className="p-4">
                                                    {editingUser === user._id ? (
                                                        <input
                                                            value={editName}
                                                            onChange={(e) => setEditName(e.target.value)}
                                                            className="bg-slate-800 p-2 rounded-md border border-white/10"
                                                        />
                                                    ) : (
                                                        user.name
                                                    )}
                                                </td>
                                                <td className="p-4">{user.email}</td>
                                                <td className="p-4">
                                                    {editingUser === user._id ? (
                                                        <select
                                                            value={editRole}
                                                            onChange={(e) => setEditRole(e.target.value)}
                                                            className="bg-slate-800 p-2 rounded-md border border-white/10"
                                                        >
                                                            <option value="user">User</option>
                                                            <option value="admin">Admin</option>
                                                        </select>
                                                    ) : (
                                                        user.role
                                                    )}
                                                </td>
                                                <td className="p-4 text-right space-x-3">
                                                    {editingUser === user._id ? (
                                                        <>
                                                            <button
                                                                className="text-green-400"
                                                                onClick={saveUserEdit}
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                className="text-yellow-400"
                                                                onClick={cancelEditing}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                className="text-yellow-400"
                                                                onClick={() => startEditing(user)}
                                                            >
                                                                <Edit size={18} />
                                                            </button>
                                                            <button
                                                                className="text-red-400"
                                                                onClick={() => handleDeleteUser(user._id)}
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                )}

                {activeTab === "scientists" && (
                    <section className="space-y-8">
                        <h1 className="text-3xl font-bold">Scientists</h1>

                        {/* ================= TABLE ================= */}
                        <div className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden">
                            {loadingScientists ? (
                                <p className="p-4">Loading...</p>
                            ) : (
                                <table className="w-full">
                                    <thead className="bg-slate-800 text-cyan-400">
                                        <tr>
                                            <th className="p-4">Name</th>
                                            <th className="p-4">Field</th>
                                            <th className="p-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scientists.map((s) => (
                                            <tr key={s._id} className="border-t border-white/5">
                                                <td className="p-4">{s.name}</td>
                                                <td className="p-4">{s.field}</td>
                                                <td className="p-4 text-right space-x-3">
                                                    <button
                                                        className="text-yellow-400"
                                                        onClick={() => startEditScientist(s)}
                                                    >
                                                        <Edit size={18} />
                                                    </button>

                                                    <button
                                                        className="text-red-400"
                                                        onClick={() => handleDeleteScientist(s._id)}
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        <div className="bg-slate-900 p-6 rounded-2xl border border-white/10">
                            <h2 className="text-xl mb-4 text-cyan-400">
                                {editingScientist ? "Edit Scientist" : "Add Scientist"}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <input name="name" value={scientistForm.name} onChange={handleScientistChange} placeholder="Name" className="input" />
                                <input name="field" value={scientistForm.field} onChange={handleScientistChange} placeholder="Field" className="input" />
                                <input name="image" value={scientistForm.image} onChange={handleScientistChange} placeholder="Image URL" className="input" />
                                <input name="tagline" value={scientistForm.tagline} onChange={handleScientistChange} placeholder="Tagline" className="input" />

                                <input name="era" value={scientistForm.era} onChange={handleScientistChange} placeholder="Era" className="input" />
                                <input name="nationality" value={scientistForm.nationality} onChange={handleScientistChange} placeholder="Nationality" className="input" />
                                <input name="born" value={scientistForm.born} onChange={handleScientistChange} placeholder="Born" className="input" />
                                <input name="died" value={scientistForm.died} onChange={handleScientistChange} placeholder="Died" className="input" />

                            </div>

                            <textarea name="description" value={scientistForm.description} onChange={handleScientistChange} placeholder="Short Description" className="textarea mt-4" />
                            <textarea name="bio" value={scientistForm.bio} onChange={handleScientistChange} placeholder="Full Bio" className="textarea mt-4" />

                            <textarea name="story" value={scientistForm.story} onChange={handleScientistChange} placeholder="Story (one per line)" className="textarea mt-4" />
                            <textarea name="impact" value={scientistForm.impact} onChange={handleScientistChange} placeholder="Impact (one per line)" className="textarea mt-4" />
                            <textarea name="quotes" value={scientistForm.quotes} onChange={handleScientistChange} placeholder="Quotes (one per line)" className="textarea mt-4" />
                            <textarea name="funFacts" value={scientistForm.funFacts} onChange={handleScientistChange} placeholder="Fun Facts (one per line)" className="textarea mt-4" />

                            <button
                                onClick={handleScientistSubmit}
                                className="mt-6 px-6 py-3 bg-cyan-500 text-black rounded-xl font-semibold hover:scale-105 transition"
                            >
                                {editingScientist ? "Update Scientist" : "Create Scientist"}
                            </button>
                        </div>



                    </section>
                )}


                {/* ================= DISCOVERIES ================= */}
                {activeTab === "discoveries" && (
                    <section className="space-y-8">
                        <h1 className="text-3xl font-bold">Discoveries</h1>

                        <div className="bg-slate-900 p-6 rounded-2xl border border-white/10">
                            <h2 className="text-xl mb-4 text-cyan-400">Add Discovery</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    placeholder="Title"
                                    className="bg-slate-800 p-3 rounded-xl border border-white/10"
                                />
                                <input
                                    placeholder="Year"
                                    className="bg-slate-800 p-3 rounded-xl border border-white/10"
                                />
                            </div>

                            <button className="mt-4 px-6 py-3 bg-cyan-500 text-black rounded-xl font-semibold">
                                Add Discovery
                            </button>
                        </div>
                    </section>
                )}

                {/* ================= STORIES ================= */}
                {activeTab === "stories" && (
                    <section className="space-y-8">
                        <h1 className="text-3xl font-bold">Discovery Stories</h1>

                        <div className="bg-slate-900 p-6 rounded-2xl border border-white/10">
                            <h2 className="text-xl mb-4 text-cyan-400">Add Story</h2>

                            <input
                                placeholder="Story Title"
                                className="w-full bg-slate-800 p-3 rounded-xl border border-white/10 mb-4"
                            />

                            <textarea
                                placeholder="Story Content"
                                rows={4}
                                className="w-full bg-slate-800 p-3 rounded-xl border border-white/10"
                            />

                            <button className="mt-4 px-6 py-3 bg-cyan-500 text-black rounded-xl font-semibold">
                                Add Story
                            </button>
                        </div>
                    </section>
                )}

            </main>
        </div>
    );
}
