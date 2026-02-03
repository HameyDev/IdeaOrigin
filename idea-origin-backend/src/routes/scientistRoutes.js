import express from "express";
import { getAllScientists, getScientistById, } from "../controllers/scientistController.js";

const router = express.Router();

router.get("/", getAllScientists);

router.get("/:id", getScientistById);

export default router;