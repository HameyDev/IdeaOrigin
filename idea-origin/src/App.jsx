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
import AdminLayout from "./pages/admin/AdminLayout"

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Users from "./pages/admin/Users";
import ScientistsAdmin from "./pages/admin/Scientists";
import CreateScientist from "./pages/admin/CreateScientist";
import Discoveries from "./pages/admin/Discoveries";
import CreateDiscovery from "./pages/admin/CreateDiscovery";
import Stories from "./pages/admin/Stories";
import CreateStory from "./pages/admin/CreateStory";

import CustomToaster from "./components/CustomToaster";

function App() {
  return (
    <AuthProvider>
      <CustomToaster />
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
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Users />} />

          <Route path="scientists" element={<ScientistsAdmin />} />
          <Route path="create-scientist" element={<CreateScientist />} />

          <Route path="discoveries" element={<Discoveries />} />
          <Route path="create-discovery" element={<CreateDiscovery />} />

          <Route path="stories" element={<Stories />} />
          <Route path="create-story" element={<CreateStory />} />
        </Route>
      </Routes>

      <Footer />
    </AuthProvider>
  );
}

export default App;
