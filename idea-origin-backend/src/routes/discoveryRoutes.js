import express from "express";
import { getAllDiscoveries, getDiscoveryById, getDiscoveriesByScientist, createDiscovery, updateDiscovery, deleteDiscovery, } from "../controllers/discoveryController.js";

const router = express.Router();


router.get("/", getAllDiscoveries);
router.get("/scientist/:scientistId", getDiscoveriesByScientist);
router.get("/:id", getDiscoveryById);
router.post("/", createDiscovery);
router.put("/:id", updateDiscovery);
router.delete("/:id", deleteDiscovery);

export default router;
