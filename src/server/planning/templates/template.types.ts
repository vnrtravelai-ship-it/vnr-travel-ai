/* ============================================================
 * VNR Travel AI
 * Planning Template
 * ============================================================
 */

import { TravelStyle } from "../models/travel-intent.model";

export interface PlanningTemplate {

    /**
     * Unique template id
     */
    id: string;

    /**
     * Departure city
     */
    departure: string;

    /**
     * Destination city
     */
    destination: string;

    /**
     * Number of travel days
     */
    days: number;

    /**
     * Budget level
     */
    budgetLevel: string;

    /**
     * Travel style
     */
    travelStyle: TravelStyle;

    /**
     * Supported locale
     */
    locale: string;

    /**
     * Currency
     */
    currency: string;

    /**
     * Template version
     */
    version: string;

    /**
     * Author
     */
    createdBy: string;

    /**
     * Description
     */
    description: string;

    /**
     * Priority when matching
     */
    priority: number;

    /**
     * Whether template is enabled
     */
    enabled: boolean;

}