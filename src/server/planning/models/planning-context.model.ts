import { PlanningRequest } from "./planning-request.model";

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
 * Tours
 * ===================================================== */

export interface TourPlan {

    name: string;

    location: string;

    duration: string;

    estimatedPrice: number;

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

    budget?: BudgetPlan;

    affiliate?: AffiliatePlan;

    metadata: {

        plannerVersion: string;

        generatedAt: Date;

        locale: string;

        currency: string;

    };

}