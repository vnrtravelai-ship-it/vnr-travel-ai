import { PlanningRequest } from "./planning-request.model";

export interface RailwayPlan {
  trainCode: string;
  departureStation: string;
  arrivalStation: string;
  departureTime: string;
  arrivalTime: string;
  seatType: string;
  estimatedPrice: number;
  duration: string;
}

export interface HotelPlan {
  hotelName: string;
  location: string;
  checkIn?: string;
  checkOut?: string;
  pricePerNight: number;
  affiliateProvider?: string;
}

export interface FoodPlan {
  breakfast?: string;
  lunch?: string;
  dinner?: string;
  coffee?: string;
  specialties: string[];
}

export interface TourPlan {
  name: string;
  location: string;
  duration: string;
  estimatedPrice: number;
}

export interface BudgetPlan {
  railway: number;
  hotel: number;
  food: number;
  tours: number;
  transport: number;
  miscellaneous: number;
  total: number;
}

export interface AffiliatePlan {
  railway?: string;
  hotel?: string;
  tour?: string;
}

export interface PlanningContext {
  request: PlanningRequest;

  railway?: RailwayPlan;

  hotel?: HotelPlan;

  food?: FoodPlan;

  tours: TourPlan[];

  budget?: BudgetPlan;

  affiliate?: AffiliatePlan;

  metadata: {
    plannerVersion: string;
    generatedAt: Date;
    locale: string;
    currency: string;
  };
}