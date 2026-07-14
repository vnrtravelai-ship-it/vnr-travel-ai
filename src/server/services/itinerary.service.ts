import { getAiClient } from "../providers/gemini.provider";
import { buildItineraryPrompt } from "./itinerary.prompt";
import { itinerarySystemInstruction } from "./itinerary.system";
import { itinerarySchema } from "./itinerary.schema";
import { PlanningEngine } from "../planning/planning.engine";
const planningEngine = new PlanningEngine();
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
  const planningContext =
  await planningEngine.buildContext({
    departure: request.departure,
    destination: request.arrival,

    numberOfDays: request.daysCount ?? 3,

    adults: 1,

    children: 0,

    budgetLevel: request.budgetLevel,

    travelStyle: request.travelStyle,

    companion: request.companion,
  });

  console.log(planningContext);

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