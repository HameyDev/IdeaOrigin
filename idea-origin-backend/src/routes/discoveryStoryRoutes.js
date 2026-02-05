import express from "express";
import { getStoryByDiscoveryId, createDiscoveryStory, updateDiscoveryStory, deleteDiscoveryStory, } from "../controllers/discoveryStoryController.js";

const router = express.Router();


router.get("/:discoveryId", getStoryByDiscoveryId);
router.post("/", createDiscoveryStory);
router.put("/:id", updateDiscoveryStory);
router.delete("/:id", deleteDiscoveryStory);

export default router;
