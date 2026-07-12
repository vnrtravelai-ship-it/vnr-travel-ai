import { Request, Response } from "express";
import { generateItinerary } from "../services/itinerary.service";

export async function createItinerary(
  req: Request,
  res: Response
) {
  try {
    const result = await generateItinerary(req.body);
    res.json(result);
  } catch (error: any) {
    console.error("Itinerary Error:", error);

    res.status(500).json({
      error: "Không thể tạo lịch trình bằng AI.",
      details: error.message,
    });
  }
}