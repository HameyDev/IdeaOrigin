import express from "express";
import { register, login, updateProfile, changePassword } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
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


export default router;
