// src/pages/admin/Users.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");

  const token = localStorage.getItem("token"); // Admin token

  // Fetch users
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

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
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

  // Edit user
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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-cyan-400">Users</h1>

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
    </div>
  );
};

export default Users;
