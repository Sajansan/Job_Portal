import express from "express";
import { createSkill, getSkills } from "../controllers/skillController.js";
import { verifyTokenMiddleware } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", verifyTokenMiddleware, checkRole("admin"), createSkill);
router.get("/", getSkills);

export default router;
