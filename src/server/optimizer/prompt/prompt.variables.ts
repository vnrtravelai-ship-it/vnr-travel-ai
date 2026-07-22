import { PlanningContext }
    from "../../planning/models/planning-context.model";

import { ConstraintResult }
    from "../models/constraint-result.model";

import { ReflectionSuggestion }
    from "../reflection/reflection.types";

import { RepairInstruction }
    from "../repair/repair.types";

/**
 * ==========================================
 * Prompt Variables
 * ==========================================
 *
 * Đây là dữ liệu được inject
 * vào Prompt Template.
 *
 * Prompt Engine sẽ chỉ thay thế
 * các biến này,
 * không tự sinh dữ liệu.
 */

export interface PromptVariables {

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
    repairs: RepairInstruction[];

    /**
     * User locale
     */
    locale: string;

    /**
     * Currency
     */
    currency: string;

}

/**
 * ==========================================
 * Prompt Variable Builder
 * ==========================================
 */

export class PromptVariablesBuilder {

    build(

        planningContext: PlanningContext,

        validation: ConstraintResult,

        suggestions: ReflectionSuggestion[],

        repairs: RepairInstruction[]

    ): PromptVariables {

        return {

            planningContext,

            validation,

            suggestions,

            repairs,

            locale:

                planningContext
                    .metadata
                    .locale,

            currency:

                planningContext
                    .metadata
                    .currency

        };

    }

}