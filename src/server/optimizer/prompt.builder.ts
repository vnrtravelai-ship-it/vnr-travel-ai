import { PlanningContext }
    from "../planning/models/planning-context.model";

import { ConstraintResult }
    from "./models/constraint-result.model";

import { ReflectionSuggestion }
    from "./reflection/reflection.types";

export interface PromptPayload {

    planningContext: PlanningContext;

    validation: ConstraintResult;

    suggestions: ReflectionSuggestion[];

    systemPrompt: string;

}

export class PromptBuilder {

    build(

        planningContext: PlanningContext,

        validation: ConstraintResult,

        suggestions: ReflectionSuggestion[]

    ): PromptPayload {

        return {

            planningContext,

            validation,

            suggestions,

            systemPrompt:

`You are VNR Travel AI.

Your responsibility is ONLY to generate the final itinerary.

You MUST NOT change business decisions.

You MUST NOT invent railway schedules.

You MUST respect all planner outputs.

You MUST respect validation results.

You MUST follow optimization suggestions.

Output MUST be valid JSON.`

        };

    }

}