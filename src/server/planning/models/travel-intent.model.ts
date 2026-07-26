/* ============================================================
 * VNR Travel AI
 * Travel Intent Model
 * ------------------------------------------------------------
 * Represents normalized user travel preferences.
 * Generated from PlanningRequest before entering
 * the Planning Engine pipeline.
 * ============================================================ */

export enum BudgetLevel {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    LUXURY = "LUXURY"
}

export enum TravelStyle {
    RELAX = "RELAX",
    EXPLORE = "EXPLORE",
    FAMILY = "FAMILY",
    ROMANTIC = "ROMANTIC",
    ADVENTURE = "ADVENTURE",
    BUSINESS = "BUSINESS",
    CULTURE = "CULTURE",
    FOOD = "FOOD"
}

export enum CompanionType {
    SOLO = "SOLO",
    COUPLE = "COUPLE",
    FAMILY = "FAMILY",
    FRIENDS = "FRIENDS",
    BUSINESS = "BUSINESS"
}

export interface TravelIntent {

    /**
     * Budget preference.
     */
    budgetLevel: BudgetLevel;

    /**
     * Travel style.
     */
    travelStyle: TravelStyle;

    /**
     * Travelling companion.
     */
    companion: CompanionType;

    /**
     * User interests.
     */
    interests: string[];

    /**
     * Preferred hotel stars.
     */
    preferredHotelStars?: number;

    /**
     * Preferred transport.
     */
    preferredTransport?: string;

    /**
     * Preferred meal types.
     */
    preferredFoods?: string[];

    /**
     * Maximum walking distance (meters).
     */
    maxWalkingDistance?: number;

    /**
     * Whether user prefers railway experiences.
     */
    railwayExperiencePriority?: boolean;

    /**
     * Whether to optimize by cost.
     */
    optimizeBudget?: boolean;

    /**
     * Whether to optimize by travel time.
     */
    optimizeTime?: boolean;

    /**
     * Whether to prioritize attractions.
     */
    attractionPriority?: boolean;

    /**
     * Whether affiliate products may be recommended.
     */
    allowAffiliateRecommendation?: boolean;

    /**
     * Preferred language.
     */
    language?: string;
}