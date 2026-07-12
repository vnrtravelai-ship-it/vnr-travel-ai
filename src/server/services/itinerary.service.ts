import { getAiClient } from "../providers/gemini.provider";
import { buildItineraryPrompt } from "./itinerary.prompt";
import { itinerarySystemInstruction } from "./itinerary.system";
import { itinerarySchema } from "./itinerary.schema";

export interface ItineraryRequest {
  departure: string;
  arrival: string;
  daysCount?: number;
  budgetLevel?: string;
  travelStyle?: string;
  companion?: string;
}

export async function generateItinerary(
  request: ItineraryRequest
) {
  const ai = getAiClient();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",

    contents: buildItineraryPrompt(request),

    config: {
      systemInstruction: itinerarySystemInstruction,
      responseMimeType: "application/json",
      responseSchema: itinerarySchema,
    },
  });

  return JSON.parse(response.text || "{}");
}