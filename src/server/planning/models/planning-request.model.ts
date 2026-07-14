export interface PlanningRequest {
  departure: string;

  destination: string;

  departureDate?: string;

  returnDate?: string;

  numberOfDays: number;

  adults: number;

  children: number;

  budget?: number;

  budgetLevel?: string;

  travelStyle?: string;

  interests?: string[];

  companion?: string;

  language?: string;
}