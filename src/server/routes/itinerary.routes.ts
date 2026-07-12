import { Router } from "express";
import { createItinerary } from "../controllers/itinerary.controller";

const router = Router();

router.post("/", createItinerary);

export default router;