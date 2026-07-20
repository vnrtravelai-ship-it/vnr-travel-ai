import { AIOrchestrator }
    from "../orchestrator/ai.orchestrator";

import { PlanningContext }
    from "../../planning/models/planning-context.model";

import { ConstraintResult }
    from "../../optimizer/models/constraint-result.model";

import { ReflectionSuggestion }
    from "../../optimizer/reflection.engine";

export class TripPlanningService {

    private readonly orchestrator =
        new AIOrchestrator();

    async generate<T>(

        planningContext: PlanningContext,

        validation: ConstraintResult,

        suggestions: ReflectionSuggestion[]

    ): Promise<T> {

        return this.orchestrator.generate<T>(

            planningContext,

            validation,

            suggestions

        );

    }

}