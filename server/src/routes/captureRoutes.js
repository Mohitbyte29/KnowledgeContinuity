import express from "express";
import {
  runDailyBatch,
  saveEntries,
  runOffboardingGapCheck,
  submitInterviewAnswers,
  getDailyBatchSourceItems,
} from "../controllers/captureController.js";

const router = express.Router();

router.post("/daily-batch", runDailyBatch);
router.get("/daily-batch/source", getDailyBatchSourceItems);
router.post("/save", saveEntries);
router.post("/offboarding/gap-check", runOffboardingGapCheck);
router.post("/interview", submitInterviewAnswers);

export default router;