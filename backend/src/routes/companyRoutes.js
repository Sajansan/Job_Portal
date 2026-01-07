import express from "express";
import {
  createCompanyProfile,
  getMyCompany,
} from "../controllers/companyController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("employer"),
  createCompanyProfile
);

router.get("/my", authMiddleware, roleMiddleware("employer"), getMyCompany);

export default router;
