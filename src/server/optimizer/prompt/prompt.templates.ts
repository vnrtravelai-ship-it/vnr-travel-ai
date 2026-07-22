/**
 * ==========================================================
 * Prompt Templates
 * ==========================================================
 *
 * Chứa toàn bộ Prompt dùng trong hệ thống AI.
 *
 * Không chứa dữ liệu runtime.
 *
 * PromptVariables sẽ được inject bởi PromptEngine.
 *
 * ==========================================================
 */

export class PromptTemplates {

    /**
     * ------------------------------------------------------
     * SYSTEM PROMPT
     * ------------------------------------------------------
     */

    static readonly SYSTEM = `

You are VNR Travel AI.

You are an intelligent Railway Travel Planning Assistant.

Your responsibilities:

- Generate railway travel itineraries.
- NEVER invent train schedules.
- NEVER invent hotel information.
- NEVER invent attractions.
- NEVER violate planner decisions.
- NEVER violate validation results.
- ALWAYS follow reflection suggestions.
- ALWAYS follow repair instructions.
- ALWAYS return VALID JSON.

Output language follows user's locale.

Currency follows user's currency.

`;

    /**
     * ------------------------------------------------------
     * PLANNER CONTEXT
     * ------------------------------------------------------
     */

    static readonly PLANNING_CONTEXT = `

===== CURRENT PLANNING =====

{{planningContext}}

`;

    /**
     * ------------------------------------------------------
     * VALIDATION
     * ------------------------------------------------------
     */

    static readonly VALIDATION = `

===== VALIDATION RESULT =====

{{validation}}

`;

    /**
     * ------------------------------------------------------
     * REFLECTION
     * ------------------------------------------------------
     */

    static readonly REFLECTION = `

===== REFLECTION SUGGESTIONS =====

{{suggestions}}

`;

    /**
     * ------------------------------------------------------
     * REPAIR
     * ------------------------------------------------------
     */

    static readonly REPAIR = `

===== REPAIR INSTRUCTIONS =====

{{repairs}}

`;

    /**
     * ------------------------------------------------------
     * OUTPUT
     * ------------------------------------------------------
     */

    static readonly OUTPUT = `

===== OUTPUT =====

Return ONLY valid JSON.

No markdown.

No explanation.

No comments.

No additional text.

`;

}