import { getAiClient } from "../providers/gemini.provider";
import { chatSystemInstruction } from "./chat.system";

export interface ChatHistory {
  role: "user" | "assistant";
  text: string;
}

export async function generateChat(
  message: string,
  history: ChatHistory[] = []
): Promise<string> {
  const ai = getAiClient();

  const contents: any[] = [];

  for (const turn of history) {
    contents.push({
      role: turn.role === "user" ? "user" : "model",
      parts: [{ text: turn.text }],
    });
  }

  contents.push({
    role: "user",
    parts: [{ text: message }],
  });

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
    config: {
      systemInstruction: chatSystemInstruction,
      temperature: 0.7,
      maxOutputTokens: 500,
    },
  });

  return result.text ?? "Tôi có thể giúp gì thêm cho chuyến đi của bạn?";
}