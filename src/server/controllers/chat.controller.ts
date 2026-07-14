import { Request, Response } from "express";
import { generateChat } from "../services/chat.service";

export async function chat(
  req: Request,
  res: Response
) {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const text = await generateChat(message, history);

    res.json({
      text,
    });
  } catch (error: any) {
    console.error("Chat Error:", error);

    res.status(500).json({
      error: "Không thể kết nối AI.",
      details: error.message,
    });
  }
}