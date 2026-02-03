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


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";



function App() {

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore-discovery" element={<Explore />} />
        <Route path="/explore-scientists" element={<Scientists />} />
        <Route path="/scientist/:id" element={<ScientistProfile />} />
        <Route path="/discovery/:id" element={<DiscoveryStory />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
