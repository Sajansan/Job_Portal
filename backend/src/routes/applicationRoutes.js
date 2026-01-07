import express from "express";
import {
  applyForJob,
  getMyApplications,
  getApplicantsForJob,
} from "../controllers/applicationController.js";

import { verifyTokenMiddleware } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Job seeker applies for a job
router.post(
  "/apply/:jobId",
  verifyTokenMiddleware,
  checkRole("job_seeker"),
  applyForJob
);

// Job seeker views his applications
router.get(
  "/my-applications",
  verifyTokenMiddleware,
  checkRole("job_seeker"),
  getMyApplications
);

// Employer views applicants for a job
router.get(
  "/job/:jobId",
  verifyTokenMiddleware,
  checkRole("employer"),
  getApplicantsForJob
);

export default router;
