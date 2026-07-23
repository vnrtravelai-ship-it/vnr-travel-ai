import { HealingRequest }

    from "./healing.types";

/**
 * =====================================================
 * Healing Prompt Builder
 * Sprint 4.8
 * =====================================================
 */

export class HealingPromptBuilder {

    build(

        request: HealingRequest

    ): string {

        return `

You are VNR Travel AI Self-Healing Engine.

The previous AI response is INVALID.

Your ONLY task is to repair the response.

--------------------------------------------------

Validation Errors

${this.formatErrors(request.errors)}

--------------------------------------------------

Previous Response

${request.rawResponse}

--------------------------------------------------

Repair Instructions

${this.formatInstructions(request)}

--------------------------------------------------

Rules

1. Keep the original itinerary whenever possible.

2. Do NOT invent railway schedules.

3. Do NOT change planner decisions.

4. Fix ONLY the reported validation errors.

5. Return ONLY valid JSON.

`;

    }

    /**
     * ----------------------------------------
     * Validation Errors
     * ----------------------------------------
     */

    private formatErrors(

        errors: string[]

    ): string {

        return errors

            .map(

                error => `- ${error}`

            )

            .join("\n");

    }

    /**
     * ----------------------------------------
     * Repair Instructions
     * ----------------------------------------
     */

    private formatInstructions(

        request: HealingRequest

    ): string {

        return request.repair.instructions

            .map(

                instruction =>

                    `[${instruction.priority}] ${instruction.instruction}`

            )

            .join("\n");

    }

}