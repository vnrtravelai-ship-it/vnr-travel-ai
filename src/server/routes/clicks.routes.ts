import { Router } from "express";
import {
  createClick,
  getClicks,
} from "../controllers/clicks.controller";

const router = Router();

router.get("/clicks", getClicks);

router.post("/clicks", createClick);

export default router;