/* ============================================================
 * VNR Travel AI
 * Planning Metadata Model
 * ------------------------------------------------------------
 * Single source of truth for planning metadata.
 * Used by PlanningContext, Optimizer and AI Core.
 * ============================================================ */

export interface PlanningMetadata {
    /**
     * Planning engine version.
     * Example: 4.9.0
     */
    plannerVersion: string;

    /**
     * UTC timestamp when the plan is generated.
     */
    generatedAt: Date;

    /**
     * Locale.
     * Example:
     * vi-VN
     * en-US
     */
    locale: string;

    /**
     * Currency code.
     * Example:
     * VND
     * USD
     */
    currency: string;

    /**
     * AI Provider.
     * Gemini
     * OpenAI
     * Claude
     */
    aiProvider?: string;

    /**
     * AI model.
     * Example:
     * gemini-2.5-pro
     * gpt-5.5
     */
    model?: string;

    /**
     * Unique planning request id.
     */
    requestId?: string;

    /**
     * Planning execution duration (milliseconds).
     */
    executionTimeMs?: number;

    /**
     * Metadata schema version.
     */
    schemaVersion?: string;

    /**
     * Debug mode.
     */
    debug?: boolean;
}