import express from "express";
import { getAllDiscoveries, getDiscoveryById, getDiscoveriesByScientist, } from "../controllers/discoveryController.js";

const router = express.Router();

// /api/discoveries
router.get("/", getAllDiscoveries);

// /api/discoveries/:id
router.get("/:id", getDiscoveryById);

// /api/discoveries/scientist/:scientistId
router.get("/scientist/:scientistId", getDiscoveriesByScientist);

export default router;
