import { ReflectionSuggestion }

    from "./reflection/reflection.types";

export function buildReflectionPrompt(

    suggestions:

    ReflectionSuggestion[]

): string {

    if (

        suggestions.length === 0

    ) {

        return "";

    }

    return `

The previous itinerary contains validation problems.

You MUST correct ALL of them.

Corrections:

${suggestions

    .map(

        s =>

`- ${s.instruction}`

    )

    .join("\n")}

Return ONLY valid JSON.

`;

}