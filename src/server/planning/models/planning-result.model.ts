/* ============================================================
 * VNR Travel AI
 * Planning Result Model
 * ------------------------------------------------------------
 * Final output of the Planning Engine before AI formatting.
 * Used by Planner API, AI Orchestrator and Frontend.
 * ============================================================ */

import { PlanningContext } from "./planning-context.model";

export enum PlanningStatus {
    SUCCESS = "SUCCESS",
    PARTIAL = "PARTIAL",
    FAILED = "FAILED"
}

export interface PlanningWarning {

    code: string;

    message: string;

    module?: string;

}

export interface PlanningError {

    code: string;

    message: string;

    module?: string;

    recoverable?: boolean;

}

export interface PlanningResult {

    /**
     * Planning status.
     */
    status: PlanningStatus;

    /**
     * Final planning context.
     */
    context?: PlanningContext;

    /**
     * Warnings generated during planning.
     */
    warnings: PlanningWarning[];

    /**
     * Errors generated during planning.
     */
    errors: PlanningError[];

    /**
     * Overall planning score.
     * 0 - 100
     */
    score?: number;

    /**
     * Whether the result can continue
     * into AI formatting.
     */
    readyForAI: boolean;

    /**
     * Execution timestamp.
     */
    generatedAt: Date;
}