import { PlanningContext }
    from "../../planning/models/planning-context.model";

import { ConstraintResult }
    from "../models/constraint-result.model";

import { ReflectionSuggestion }
    from "../reflection/reflection.types";

import { RepairBuilder }
    from "./repair.builder";

import {

    RepairPayload,

    RepairResult

}
    from "./repair.types";

import { AIOrchestrator }
    from "../../ai/orchestrator/ai.orchestrator";

export class RepairEngine {

    private readonly builder =
        new RepairBuilder();

    private readonly orchestrator =
        new AIOrchestrator();

    async repair<T>(

        planningContext: PlanningContext,

        validation: ConstraintResult,

        suggestions: ReflectionSuggestion[]

    ): Promise<RepairResult<T>> {

        const payload: RepairPayload =

            this.builder.build(

                planningContext,

                validation,

                suggestions

            );

        try {

            const repaired =

                await this.orchestrator.generate<T>(

                    payload.planningContext,

                    payload.validation,

                    payload.suggestions

                );

            return {

                repaired,

                success: true,

                explanation:

                    "AI repair completed successfully."

            };

        }

        catch (

            error

        ) {

            return {

                repaired:

                    planningContext as unknown as T,

                success: false,

                explanation:

                    error instanceof Error

                        ? error.message

                        : "Unknown repair error."

            };

        }

    }

}