import { useState, useContext } from "react";
import { HiUser, HiMail, HiLockClosed } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import CustomToaster from "../components/CustomToaster";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Animation variants
  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!isLogin) {
        if (!fullName || !email || !password || !confirmPassword) {
          setError("All fields are required.");
          return;
        }
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          return;
        }

        await axios.post("https://ideaoriginbackend.onrender.com/api/auth/register", {
          name: fullName,
          email,
          password,
        });

        toast.success("Signup successful! Please login.");

        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          setIsLogin(true);
        }, 1200);
      } else {
        const res = await axios.post(
          "https://ideaoriginbackend.onrender.com/pi/auth/login",
          { email, password }
        );

        // ✅ SAVE TOKEN + USER
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // ✅ UPDATE CONTEXT
        login(res.data.user);

        toast.success("Login successful!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1200);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <CustomToaster />

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-950/10 to-slate-500/10 blur-3xl animate-pulse-slow pointer-events-none"></div>

      {/* Card */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isLogin ? "login" : "signup"}
          className="relative z-10 w-full max-w-md bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {isLogin ? "Welcome Back" : "Create Account"}
          </motion.h2>

          <motion.p
            className="text-gray-300 text-center mt-2 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {isLogin ? "Login to continue your journey" : "Join Discovery Stories today"}
          </motion.p>



          {/* Form */}
          <motion.form
            className="mt-8 space-y-5"
            onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="fullname"
                  className="relative"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.4 }}
                >
                  <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="relative"
              variants={fadeUp}
              transition={{ duration: 0.4 }}
            >
              <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              />
            </motion.div>

            <motion.div
              className="relative"
              variants={fadeUp}
              transition={{ duration: 0.4 }}
            >
              <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              />

            </motion.div>



            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="confirm"
                  className="relative"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.4 }}
                >
                  <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            {error && (
              <motion.div
                className="text-red-500 text-end  text-sm sm:text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-4 rounded-xl text-white font-semibold text-sm sm:text-base bg-gradient-to-r from-cyan-500 to-emerald-500 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              variants={fadeUp}
              transition={{ duration: 0.4 }}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </motion.button>
          </motion.form>

          {/* Toggle */}
          <motion.p
            className="text-center text-gray-400 mt-6 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-cyan-400 hover:underline font-medium"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
