import { AIProviderFactory }
    from "../providers/ai-provider.factory";

import { ValidatorEngine }
    from "../validator/validator.engine";

import { HealingBuilder }
    from "./healing.builder";

import { HealingPromptBuilder }
    from "./healing.prompt";

import {
    HealingResult
}
    from "./healing.types";

import { RepairPayload }
    from "../../optimizer/repair/repair.types";

export class HealingEngine {

    private readonly provider =
        AIProviderFactory.create();

    private readonly validator =
        new ValidatorEngine();

    private readonly builder =
        new HealingBuilder();

    private readonly promptBuilder =
        new HealingPromptBuilder();

    async repair<T>(

        rawResponse: string,

        validationErrors: string[],

        repairPayload: RepairPayload,

        requiredFields: (keyof T)[]

    ): Promise<HealingResult> {

        const request =

            this.builder.build(

                rawResponse,

                validationErrors,

                repairPayload

            );

        const prompt =

            this.promptBuilder.build(

                request

            );

        const aiResponse =

    await this.provider.generate(

        prompt

    );
            

        const validation =

            this.validator.validate<T>(

                aiResponse.raw,

                requiredFields

            );

        if (

            validation.success

        ) {

            return {

                status: "SUCCESS",

                repairedResponse:
                    aiResponse.raw

            };

        }

        return {

            status: "FAILED",

            error:
                validation.errors.join("\n")

        };

    }

}