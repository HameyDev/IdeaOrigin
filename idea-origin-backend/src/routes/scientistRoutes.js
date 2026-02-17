import express from "express";
import { getAllScientists, getScientistById, createScientist, updateScientist, deleteScientist, } from "../controllers/scientistController.js";

import upload from "../middleware/uploadScientist.js";

const router = express.Router();


router.get("/", getAllScientists);
router.get("/:id", getScientistById);
router.post("/", upload.single("image"), createScientist);
router.put("/:id", upload.single("image"), updateScientist);
router.delete("/:id", deleteScientist);

export default router;
