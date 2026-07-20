import { PromptBuilder }
    from "../../optimizer/prompt.builder";

import { ResponseParser }
    from "../parser/response.parser";

import { AIProviderFactory }
    from "../providers/ai-provider.factory";

import { PlanningContext }
    from "../../planning/models/planning-context.model";

import { ConstraintResult }
    from "../../optimizer/models/constraint-result.model";

import { ReflectionSuggestion }
    from "../../optimizer/reflection.engine";

export class AIOrchestrator {

    private readonly provider =
        AIProviderFactory.create();

    private readonly promptBuilder =
        new PromptBuilder();

    private readonly parser =
        new ResponseParser();

    async generate<T>(

        planningContext: PlanningContext,

        validation: ConstraintResult,

        suggestions: ReflectionSuggestion[]

    ): Promise<T> {

        const payload =
            this.promptBuilder.build(

                planningContext,

                validation,

                suggestions

            );

        const response =
            await this.provider.generate(

                payload

            );

        return this.parser.parse<T>(

            response

        );

    }

}