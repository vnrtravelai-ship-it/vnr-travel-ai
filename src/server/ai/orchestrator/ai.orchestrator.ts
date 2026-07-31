import { PromptEngine }
    from "../../optimizer/prompt/prompt.engine";

import { ResponseParser }
    from "../parser/response.parser";

import { AIProviderFactory }
    from "../providers/ai-provider.factory";

import { PlanningContext }
    from "../../planning/models/planning-context.model";

import { ConstraintResult }
    from "../../optimizer/models/constraint-result.model";

import { ReflectionSuggestion }
    from "../../optimizer/reflection/reflection.types";

import {
    RepairInstruction
}
    from "../../optimizer/repair/repair.types";

import { RetryEngine }
    from "../retry/retry.engine";

/**
 * ==========================================================
 * AI Orchestrator
 * ==========================================================
 *
 * Pipeline:
 *
 * Planning
 *      ↓
 * Constraint Validation
 *      ↓
 * Reflection
 *      ↓
 * Repair
 *      ↓
 * Prompt Engine
 *      ↓
 * AI Provider
 *      ↓
 * Response Parser
 *
 * ==========================================================
 */

export class AIOrchestrator {

    private readonly provider =
        AIProviderFactory.create();

    private readonly promptEngine =
        new PromptEngine();

    private readonly parser =
        new ResponseParser();

    private readonly retryEngine =
        new RetryEngine();

    async generate<T>(

        planningContext: PlanningContext,

        validation: ConstraintResult,

        suggestions: ReflectionSuggestion[],

        repairs: RepairInstruction[]

    ): Promise<T> {

        const prompt =
            this.promptEngine.build(

                planningContext,

                validation,

                suggestions,

                repairs

            );

        const retry =
            await this.retryEngine.execute(

                () =>

                    this.provider.generate(

                        prompt

                    )

            );

        if (

            !retry.success ||

            !retry.result

        ) {

            throw new Error(

                "AI generation failed after retry."

            );

        }

        return this.parser.parse<T>(

            retry.result

        );

    }

}