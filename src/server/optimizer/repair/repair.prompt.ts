import { RepairPayload }
    from "./repair.types";

export class RepairPromptBuilder {

    build(
        payload: RepairPayload
    ): string {

        return `

You are VNR Travel AI Repair Engine.

Your ONLY responsibility is to repair the previous planning result.

Planning Context

${JSON.stringify(payload.planningContext, null, 2)}

Validation Result

${JSON.stringify(payload.validation, null, 2)}

Reflection Suggestions

${JSON.stringify(payload.suggestions, null, 2)}

Repair Instructions

${this.buildInstructions(payload)}

Rules

1. Do NOT invent railway schedules.
2. Do NOT change planner decisions.
3. Fix ONLY reported validation issues.
4. Preserve existing itinerary whenever possible.
5. Return ONLY valid JSON.
`;

    }

    private buildInstructions(
        payload: RepairPayload
    ): string {

        return payload.instructions

            .map(

                instruction =>

`[${instruction.priority}] ${instruction.code}

${instruction.instruction}`

            )

            .join("\n\n");

    }

}