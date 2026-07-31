import { ReflectionSuggestion }
    from "./reflection.types";

export class ReflectionPromptBuilder {

    build(
        suggestions: ReflectionSuggestion[]
    ): string {

        if (suggestions.length === 0) {

            return `
No reflection suggestions.
Continue with current planning.
`;

        }

        return `

You are VNR Travel AI Reflection Engine.

Review the following optimization suggestions.

${this.formatSuggestions(suggestions)}

Rules

1. Do not change planner decisions.
2. Do not invent railway schedules.
3. Minimize modifications.
4. Preserve valid itinerary.
5. Return ONLY valid JSON.

`;

    }

    private formatSuggestions(
        suggestions: ReflectionSuggestion[]
    ): string {

        return suggestions

            .map(

                suggestion => `

Code:
${suggestion.code}

Priority:
${suggestion.priority}

Title:
${suggestion.title}

Description:
${suggestion.description}

Instruction:
${suggestion.instruction}

`

            )

            .join("\n");

    }

}