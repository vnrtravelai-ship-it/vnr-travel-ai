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
    travelStyle: TravelStyle | string;

    /**
     * JSON template filename
     */
    fileName: string;

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
     * Optional fields (Sprint 5.x)
     */
    locale?: string;

    currency?: string;

    priority?: number;

    enabled?: boolean;

}