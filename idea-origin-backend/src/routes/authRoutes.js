import express from "express";
import User from "../models/User.js";

import { register, login, updateProfile, changePassword, getAllUsers, deleteUser, updateUserByAdmin } from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.put("/profile", authMiddleware, upload.single("avatar"), updateProfile);
router.put("/change-password", authMiddleware, changePassword);

router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json({ user });
});


router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

router.put("/users/:id", authMiddleware, adminMiddleware, updateUserByAdmin );


export default router;
