import express from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";
import { verifyTokenMiddleware } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", verifyTokenMiddleware, checkRole("admin"), createCategory);
router.get("/", getCategories);

export default router;
