import { PlanningContext }
    from "../../planning/models/planning-context.model";

import { ConstraintResult }
    from "../models/constraint-result.model";

import { ReflectionSuggestion }
    from "../reflection/reflection.types";

/**
 * ----------------------------------------
 * Repair Priority
 * ----------------------------------------
 */

export type RepairPriority =

    | "LOW"

    | "MEDIUM"

    | "HIGH";

/**
 * ----------------------------------------
 * Single Repair Instruction
 * ----------------------------------------
 */

export interface RepairInstruction {

    /**
     * Error code
     */

    code: string;

    /**
     * AI repair instruction
     */

    instruction: string;

    /**
     * Repair priority
     */

    priority: RepairPriority;

}

/**
 * ----------------------------------------
 * Payload sent to AI Repair Engine
 * ----------------------------------------
 */

export interface RepairPayload {

    /**
     * Current planning result
     */

    planningContext: PlanningContext;

    /**
     * Validation result
     */

    validation: ConstraintResult;

    /**
     * Reflection suggestions
     */

    suggestions: ReflectionSuggestion[];

    /**
     * Repair instructions
     */

    instructions: RepairInstruction[];

}

/**
 * ----------------------------------------
 * AI Repair Result
 * ----------------------------------------
 */

export interface RepairResult<T = unknown> {

    /**
     * Repaired planning result
     */

    repaired: T;

    /**
     * Whether repair succeeded
     */

    success: boolean;

    /**
     * AI explanation
     */

    explanation?: string;

}