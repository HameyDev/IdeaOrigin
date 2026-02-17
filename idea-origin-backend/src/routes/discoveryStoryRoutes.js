import express from "express";
import {
  getAllDiscoveryStories,
  getStoryByDiscoveryId,
  createDiscoveryStory,
  updateDiscoveryStory,
  deleteDiscoveryStory,
} from "../controllers/discoveryStoryController.js";

const router = express.Router();

// Static routes FIRST
router.get("/", getAllDiscoveryStories);
router.post("/", createDiscoveryStory);
router.put("/:id", updateDiscoveryStory);
router.delete("/:id", deleteDiscoveryStory);

// Dynamic route LAST (very important)
router.get("/by-discovery/:discoveryId", getStoryByDiscoveryId);

export default router;
