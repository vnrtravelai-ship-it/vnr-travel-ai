import { PlanningContext }
    from "../../planning/models/planning-context.model";

import { ConstraintResult }
    from "../models/constraint-result.model";

import { ReflectionSuggestion }
    from "../reflection/reflection.types";

import { RepairInstruction }
    from "../repair/repair.types";

import { PromptVariablesBuilder }
    from "./prompt.variables";

import { PromptOptimizer }
    from "./prompt.optimizer";

/**
 * ==========================================================
 * Prompt Engine
 * ==========================================================
 *
 * Pipeline:
 *
 * Planning
 *      ↓
 * Validation
 *      ↓
 * Reflection
 *      ↓
 * Repair
 *      ↓
 * PromptVariables
 *      ↓
 * PromptOptimizer
 *      ↓
 * Final Prompt
 *
 * ==========================================================
 */

export class PromptEngine {

    private readonly variablesBuilder =
        new PromptVariablesBuilder();

    private readonly optimizer =
        new PromptOptimizer();

    build(

        planningContext: PlanningContext,

        validation: ConstraintResult,

        suggestions: ReflectionSuggestion[],

        repairs: RepairInstruction[]

    ): string {

        const variables =

            this.variablesBuilder.build(

                planningContext,

                validation,

                suggestions,

                repairs

            );

        return this.optimizer.optimize(

            variables

        );

    }

}