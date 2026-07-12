import { getAiClient } from "../providers/gemini.provider";
import { buildItineraryPrompt } from "./itinerary.prompt";
import { itinerarySystemInstruction } from "./itinerary.system";

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
  if (!request.departure || !request.arrival) {
    throw new Error("Departure and arrival are required.");
  }

  const ai = getAiClient();

  const prompt = buildItineraryPrompt(request);

  return {
    ai,
    prompt,
    systemInstruction: itinerarySystemInstruction,
  };
}