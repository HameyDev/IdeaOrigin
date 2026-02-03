import express from "express";
import { getAllDiscoveryStories, getDiscoveryStoryById, getStoriesByScientist } from "../controllers/discoveryStoryController.js";

const router = express.Router();

// /api/discovery-stories
router.get("/", getAllDiscoveryStories);

// /api/discovery-stories/:id
router.get("/:id", getDiscoveryStoryById);

// /api/discovery-stories/scientist/:scientistId
router.get("/scientist/:scientistId", getStoriesByScientist);

export default router;
