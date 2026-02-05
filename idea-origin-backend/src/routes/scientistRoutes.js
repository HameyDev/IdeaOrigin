import express from "express";
import { getAllScientists, getScientistById, createScientist, updateScientist, deleteScientist, } from "../controllers/scientistController.js";

const router = express.Router();


router.get("/", getAllScientists);
router.get("/:id", getScientistById);
router.post("/", createScientist);
router.put("/:id", updateScientist);
router.delete("/:id", deleteScientist);

export default router;
