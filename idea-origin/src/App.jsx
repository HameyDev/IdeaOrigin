import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ScientistProfile from "./pages/ScientistProfile";
import DiscoveryStory from "./pages/DiscoveryStory";
import Timeline from "./pages/Timeline";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Scientists from "./pages/Scientists";
import Admin from "./pages/Admin";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/explore-discovery" element={<Explore />} />
        <Route path="/explore-scientists" element={<Scientists />} />
        <Route path="/scientist/:id" element={<ScientistProfile />} />
        <Route path="/discovery/:id" element={<DiscoveryStory />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />

        {/* USER PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ONLY */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />
    </AuthProvider>
  );
}

export default App;
