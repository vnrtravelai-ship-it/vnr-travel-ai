import { RepairPayload }
    from "../../optimizer/repair/repair.types";

/**
 * =====================================================
 * Healing Status
 * =====================================================
 */

export type HealingStatus =

    | "SUCCESS"

    | "FAILED"

    | "RETRY";

/**
 * =====================================================
 * Healing Request
 * =====================================================
 */

export interface HealingRequest {

    /**
     * Original AI response.
     */
    rawResponse: string;

    /**
     * Validation errors.
     */
    errors: string[];

    /**
     * Repair payload.
     */
    repair: RepairPayload;

}

/**
 * =====================================================
 * Healing Prompt
 * =====================================================
 */

export interface HealingPrompt {

    /**
     * Prompt sent back to AI.
     */
    prompt: string;

}

/**
 * =====================================================
 * Healing Result
 * =====================================================
 */

export interface HealingResult {

    /**
     * Healing status.
     */
    status: HealingStatus;

    /**
     * Corrected AI response.
     */
    repairedResponse?: string;

    /**
     * Error message.
     */
    error?: string;

}