import { Router } from "express";
import {
  createLead,
  getLeads,
} from "../controllers/leads.controller";

const router = Router();

router.get("/leads", getLeads);

router.post("/leads", createLead);

export default router;