import { AIOrchestrator }
    from "../orchestrator/ai.orchestrator";

import { PlanningContext }
    from "../../planning/models/planning-context.model";

import { ConstraintResult }
    from "../../optimizer/models/constraint-result.model";

import { ReflectionSuggestion }
    from "../../optimizer/reflection/reflection.types";

import { RepairInstruction }
    from "../../optimizer/repair/repair.types";

export class TripPlanningService {

    private readonly orchestrator =
        new AIOrchestrator();

    async generate<T>(

        planningContext: PlanningContext,

        validation: ConstraintResult,

        suggestions: ReflectionSuggestion[],

        repairs: RepairInstruction[]

    ): Promise<T> {

        return this.orchestrator.generate<T>(

            planningContext,

            validation,

            suggestions,

            repairs

        );

    }

}