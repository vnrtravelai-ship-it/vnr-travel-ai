/* ============================================================
 * VNR Travel AI
 * Tour Knowledge
 * ------------------------------------------------------------
 * Static attraction knowledge for Planning Engine.
 * Contains deterministic recommendation rules.
 * No repository logic.
 * No AI logic.
 * ============================================================ */

import {
    BudgetLevel,
    TravelIntent,
    TravelStyle
} from "../models/travel-intent.model";

export interface TourCategory {

    id: string;

    name: string;

    tags: string[];

}

export interface TourRule {

    style: TravelStyle;

    recommendedCategories: string[];

    maxActivitiesPerDay: number;

}

export interface TourBudgetRule {

    budget: BudgetLevel;

    averageTicketPrice: number;

}

export interface TourKnowledge {

    /**
     * Supported cities.
     */
    supportedCities: string[];

    /**
     * Attraction categories.
     */
    categories: TourCategory[];

    /**
     * Recommendation rules.
     */
    rules: TourRule[];

    /**
     * Budget rules.
     */
    budgetRules: TourBudgetRule[];

}

export const DefaultTourKnowledge: TourKnowledge = {

    supportedCities: [],

    categories: [

        {
            id: "culture",
            name: "Culture",
            tags: ["museum", "heritage", "history"]
        },

        {
            id: "nature",
            name: "Nature",
            tags: ["mountain", "beach", "park"]
        },

        {
            id: "food",
            name: "Food",
            tags: ["restaurant", "street-food", "specialty"]
        },

        {
            id: "shopping",
            name: "Shopping",
            tags: ["market", "mall", "souvenir"]
        }

    ],

    rules: [

        {
            style: TravelStyle.RELAX,
            recommendedCategories: ["nature", "food"],
            maxActivitiesPerDay: 3
        },

        {
            style: TravelStyle.EXPLORE,
            recommendedCategories: ["culture", "nature"],
            maxActivitiesPerDay: 6
        },

        {
            style: TravelStyle.FAMILY,
            recommendedCategories: ["nature", "shopping"],
            maxActivitiesPerDay: 4
        },

        {
            style: TravelStyle.ROMANTIC,
            recommendedCategories: ["nature", "food"],
            maxActivitiesPerDay: 4
        },

        {
            style: TravelStyle.ADVENTURE,
            recommendedCategories: ["nature"],
            maxActivitiesPerDay: 6
        },

        {
            style: TravelStyle.BUSINESS,
            recommendedCategories: ["food"],
            maxActivitiesPerDay: 2
        },

        {
            style: TravelStyle.CULTURE,
            recommendedCategories: ["culture"],
            maxActivitiesPerDay: 5
        },

        {
            style: TravelStyle.FOOD,
            recommendedCategories: ["food"],
            maxActivitiesPerDay: 6
        }

    ],

    budgetRules: [

        {
            budget: BudgetLevel.LOW,
            averageTicketPrice: 100000
        },

        {
            budget: BudgetLevel.MEDIUM,
            averageTicketPrice: 250000
        },

        {
            budget: BudgetLevel.HIGH,
            averageTicketPrice: 500000
        },

        {
            budget: BudgetLevel.LUXURY,
            averageTicketPrice: 1000000
        }

    ]

};

export function resolveTourRule(
    intent: TravelIntent
): TourRule {

    return (
        DefaultTourKnowledge.rules.find(
            r => r.style === intent.travelStyle
        ) ?? DefaultTourKnowledge.rules[0]
    );

}

export function resolveAverageTicketPrice(
    intent: TravelIntent
): number {

    return (
        DefaultTourKnowledge.budgetRules.find(
            r => r.budget === intent.budgetLevel
        )?.averageTicketPrice ?? 250000
    );

}