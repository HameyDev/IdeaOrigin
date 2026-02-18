import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import CustomToaster from "../components/CustomToaster";


import { User, Star, Bookmark, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";



export default function Dashboard() {
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const token = localStorage.getItem("token");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);



  const [activeTab, setActiveTab] = useState("profile");

  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFullName(user.name);
      setPreview(user.avatar ? `https://ideaoriginbackend.onrender.com${user.avatar}` : "/avatar.jpg");
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("email", user.email); // required by backend
      if (avatar) formData.append("avatar", avatar);

      const res = await axios.put(
        "https://ideaoriginbackend.onrender.com/api/auth/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 🔁 Update AuthContext user immediately
      const updatedUser = res.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setPreview(updatedUser.avatar ? `https://ideaoriginbackend.onrender.com${updatedUser.avatar}?t=${Date.now()}` : "/avatar.png");
      toast.success("Profile updated successfully!");
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

    } catch (err) {
      toast.error(err.response?.data?.message || "Profile update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setPasswordLoading(true);

      await axios.put(
        "https://ideaoriginbackend.onrender.com/api/auth/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Password updated successfully!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password update failed");
    } finally {
      setPasswordLoading(false);
    }
  };





  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/auth");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <CustomToaster />
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-slate-900 border-r border-white/10 p-6 hidden sm:flex flex-col">
        <h2 className="text-2xl font-bold mb-10 text-cyan-400">
          My Dashboard
        </h2>

        {/* NAV */}
        <nav className="space-y-3 flex-1">
          {[
            { id: "profile", label: "Profile", icon: User },
            { id: "favorites", label: "Favorite Scientists", icon: Star },
            { id: "saved", label: "Saved Discoveries", icon: Bookmark },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition
          ${activeTab === item.id
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/30"
                    : "text-gray-300 hover:bg-white/5"
                  }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl
    text-red-400 hover:bg-red-500/10 transition font-semibold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>


      </aside>


      {/* ================= MAIN ================= */}
      <main className="flex-1 p-6 sm:p-10">

        {/* ================= PROFILE ================= */}
        {activeTab === "profile" && (
          <section className="max-w-5xl space-y-12">

            <h1 className="text-3xl font-bold">Account Settings</h1>

            {/* ===== PROFILE HEADER ===== */}
            <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 border border-white/10">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <img
                    src={preview}
                    crossOrigin="anonymous"
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-cyan-400/40"
                  />

                  <label
                    className="absolute bottom-0 right-0 bg-cyan-500 text-black text-xs px-3 py-1 rounded-full font-semibold cursor-pointer hover:scale-105 transition"
                  >
                    Change
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange}
                    />
                  </label>
                </div>


                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>
            </div>

            {/* ===== UPDATE PROFILE ===== */}
            <div className="bg-slate-900 rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold mb-6">
                Update Profile
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">

                {/* FULL NAME */}
                <div>
                  <label className="text-sm text-gray-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full mt-2 bg-slate-800 border border-white/10 rounded-xl px-4 py-3"
                  />


                </div>

                {/* EMAIL (READ ONLY) */}
                <div>
                  <label className="text-sm text-gray-400">
                    Email (cannot be changed)
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full mt-2 bg-slate-800/60 rounded-xl px-4 py-3 text-gray-500"
                  />

                </div>
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold hover:scale-105 transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>

            </div>

            {/* ===== CHANGE PASSWORD ===== */}
            <div className="bg-slate-900 rounded-3xl p-8 border border-red-500/20">
              <h2 className="text-2xl font-semibold mb-6">
                Change Password
              </h2>

              <div className="space-y-4 max-w-md">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-400"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-400"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-400"
                />

                <button
                  onClick={handleChangePassword}
                  disabled={passwordLoading}
                  className="mt-4 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold disabled:opacity-50"
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ================= FAVORITES ================= */}
        {activeTab === "favorites" && (
          <section>
            <h1 className="text-3xl font-bold mb-6">
              Favorite Scientists
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Albert Einstein", "Nikola Tesla", "Isaac Newton"].map(
                (name) => (
                  <Link
                    key={name}
                    to="/scientists"
                    className="bg-slate-900 p-6 rounded-2xl border border-white/10
                    hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]
                    transition"
                  >
                    <h3 className="text-xl font-semibold">{name}</h3>
                    <p className="text-gray-400 mt-2">
                      View full profile →
                    </p>
                  </Link>
                )
              )}
            </div>
          </section>
        )}

        {/* ================= SAVED ================= */}
        {activeTab === "saved" && (
          <section>
            <h1 className="text-3xl font-bold mb-6">
              Saved Discoveries
            </h1>

            <div className="space-y-4 max-w-2xl">
              {[
                "Theory of Relativity",
                "AC Electricity",
                "Laws of Motion",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-slate-900 p-5 rounded-xl border border-white/10
                  hover:border-emerald-400 transition"
                >
                  <p className="text-lg font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
