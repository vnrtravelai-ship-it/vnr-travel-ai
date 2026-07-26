/* ============================================================
 * VNR Travel AI
 * Food Knowledge
 * ------------------------------------------------------------
 * Domain knowledge used by Planning Engine.
 * Contains deterministic rules for food planning.
 * No business logic.
 * No AI logic.
 * ============================================================ */

import {
    BudgetLevel,
    TravelStyle,
    TravelIntent
} from "../models/travel-intent.model";

export interface FoodCategory {

    id: string;

    name: string;

    tags: string[];

}

export interface FoodPreference {

    breakfast?: string[];

    lunch?: string[];

    dinner?: string[];

    coffee?: string[];

    specialties?: string[];

}

export interface FoodKnowledge {

    /**
     * Supported cities.
     */
    supportedCities: string[];

    /**
     * Food categories.
     */
    categories: FoodCategory[];

    /**
     * Default preference by travel style.
     */
    defaultPreference: Record<TravelStyle, FoodPreference>;

    /**
     * Budget recommendation.
     */
    budgetRecommendation: Record<
        BudgetLevel,
        {
            averageMealCost: number;
            coffeeCost: number;
            specialtyCost: number;
        }
    >;
}

/* ============================================================
 * Default Food Knowledge
 * ============================================================ */

export const DefaultFoodKnowledge: FoodKnowledge = {

    supportedCities: [],

    categories: [],

    defaultPreference: {

        [TravelStyle.RELAX]: {},

        [TravelStyle.EXPLORE]: {},

        [TravelStyle.FAMILY]: {},

        [TravelStyle.ROMANTIC]: {},

        [TravelStyle.ADVENTURE]: {},

        [TravelStyle.BUSINESS]: {},

        [TravelStyle.CULTURE]: {},

        [TravelStyle.FOOD]: {}

    },

    budgetRecommendation: {

        [BudgetLevel.LOW]: {
            averageMealCost: 70000,
            coffeeCost: 30000,
            specialtyCost: 50000
        },

        [BudgetLevel.MEDIUM]: {
            averageMealCost: 150000,
            coffeeCost: 50000,
            specialtyCost: 80000
        },

        [BudgetLevel.HIGH]: {
            averageMealCost: 300000,
            coffeeCost: 90000,
            specialtyCost: 150000
        },

        [BudgetLevel.LUXURY]: {
            averageMealCost: 700000,
            coffeeCost: 180000,
            specialtyCost: 300000
        }

    }

};

/* ============================================================
 * Helper
 * ============================================================ */

export function resolveFoodPreference(
    intent: TravelIntent
): FoodPreference {

    return (
        DefaultFoodKnowledge.defaultPreference[intent.travelStyle] ?? {}
    );

}