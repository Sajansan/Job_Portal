import express from "express";
import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

import { verifyTokenMiddleware } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", verifyTokenMiddleware, checkRole("employer"), createJob);
router.put("/:id", verifyTokenMiddleware, checkRole("employer"), updateJob);
router.delete("/:id", verifyTokenMiddleware, checkRole("employer"), deleteJob);

router.get("/", getJobs); // public

export default router;
