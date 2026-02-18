import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import path from "path";

import authRoutes from "./routes/authRoutes.js";
import scientistRoutes from "./routes/scientistRoutes.js";
import discoveryRoutes from "./routes/discoveryRoutes.js";
import discoveryStoryRoutes from "./routes/discoveryStoryRoutes.js";


const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "https://ideaorigin.onrender.com", credentials: true }));
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"), {
  setHeaders: (res, path) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
}));
app.use("/api/scientists", scientistRoutes);
app.use("/api/discoveries", discoveryRoutes);
app.use("/api/discovery-stories", discoveryStoryRoutes);


// Test route
app.get("/", (req, res) => {
  res.json({ status: "Backend Running" });
});

export default app;
