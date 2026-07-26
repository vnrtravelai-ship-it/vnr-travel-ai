/* ============================================================
 * VNR Travel AI
 * Hotel Knowledge
 * ------------------------------------------------------------
 * Static hotel planning knowledge.
 * Used by Planning Engine only.
 * No repository logic.
 * No AI logic.
 * ============================================================ */

import {
    BudgetLevel,
    TravelIntent
} from "../models/travel-intent.model";

export interface HotelStarRange {

    min: number;

    max: number;

}

export interface HotelRule {

    budget: BudgetLevel;

    starRange: HotelStarRange;

    averagePricePerNight: number;

}

export interface HotelKnowledge {

    /**
     * Supported cities.
     */
    supportedCities: string[];

    /**
     * Budget rules.
     */
    rules: HotelRule[];

    /**
     * Default check-in time.
     */
    defaultCheckIn: string;

    /**
     * Default check-out time.
     */
    defaultCheckOut: string;

}

export const DefaultHotelKnowledge: HotelKnowledge = {

    supportedCities: [],

    defaultCheckIn: "14:00",

    defaultCheckOut: "12:00",

    rules: [

        {
            budget: BudgetLevel.LOW,
            starRange: {
                min: 1,
                max: 2
            },
            averagePricePerNight: 350000
        },

        {
            budget: BudgetLevel.MEDIUM,
            starRange: {
                min: 3,
                max: 4
            },
            averagePricePerNight: 900000
        },

        {
            budget: BudgetLevel.HIGH,
            starRange: {
                min: 4,
                max: 5
            },
            averagePricePerNight: 1800000
        },

        {
            budget: BudgetLevel.LUXURY,
            starRange: {
                min: 5,
                max: 5
            },
            averagePricePerNight: 3500000
        }

    ]

};

export function resolveHotelRule(
    intent: TravelIntent
): HotelRule {

    return (
        DefaultHotelKnowledge.rules.find(
            r => r.budget === intent.budgetLevel
        ) ?? DefaultHotelKnowledge.rules[1]
    );

}