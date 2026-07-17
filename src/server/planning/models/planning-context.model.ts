import { PlanningRequest } from "./planning-request.model";

import { DayPlan }
from "../../itinerary/models/day-plan.model";

/* =====================================================
 * Railway
 * ===================================================== */

export interface RailwayPlan {

    trainCode: string;

    departureStation: string;

    arrivalStation: string;

    departureTime: string;

    arrivalTime: string;

    seatType: string;

    estimatedPrice: number;

    duration: string;

    distanceKm: number;

}

/* =====================================================
 * Hotel
 * ===================================================== */

export interface HotelSummary {

    id: string;

    name: string;

    stars: number;

    priceFrom: number;

    address: string;

    latitude?: number;

    longitude?: number;

    affiliateProvider?: string;

    affiliateUrl?: string;

}

export interface HotelPlan {

    recommendedHotels: HotelSummary[];

    selectedHotel?: HotelSummary;

}

/* =====================================================
 * Food
 * ===================================================== */

export interface FoodPlan {

    breakfast?: string;

    lunch?: string;

    dinner?: string;

    coffee?: string;

    specialties: string[];

}

/* =====================================================
 * Tour / POI
 * ===================================================== */

export interface TourPlan {

    id: string;

    city: string;

    name: string;

    category: string;

    duration: string;

    estimatedPrice: number;

    address: string;

    openingHours: string;

    latitude?: number;

    longitude?: number;

    tags: string[];

    affiliateProvider?: string;

    affiliateUrl?: string;

}

/* =====================================================
 * Budget
 * ===================================================== */

export interface BudgetPlan {

    railway: number;

    hotel: number;

    food: number;

    tours: number;

    transport: number;

    miscellaneous: number;

    total: number;

}

/* =====================================================
 * Affiliate
 * ===================================================== */

export interface AffiliatePlan {

    railway?: string;

    hotel?: string;

    tour?: string;

    flight?: string;

    bus?: string;

    insurance?: string;

}

/* =====================================================
 * AI Metadata
 * ===================================================== */

export interface PlanningMetadata {

    plannerVersion: string;

    generatedAt: Date;

    locale: string;

    currency: string;

    aiProvider?: string;

    model?: string;

}

/* =====================================================
 * Planning Context
 * ===================================================== */

export interface PlanningContext {

    request: PlanningRequest;

    railway?: RailwayPlan;

    hotel?: HotelPlan;

    food?: FoodPlan;

    tours: TourPlan[];

    itinerary: DayPlan[];

    budget?: BudgetPlan;

    affiliate?: AffiliatePlan;

    metadata: PlanningMetadata;

}