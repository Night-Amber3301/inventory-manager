import { Router } from "express";
import { register, login, profile, refresh, logout, updatePassword } from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

router.get("/profile", authenticate, profile);
router.patch("/change-password", authenticate, updatePassword);

export default router;