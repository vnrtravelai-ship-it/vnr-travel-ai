import { PromptVariables }
    from "./prompt.variables";

import { PromptTemplates }
    from "./prompt.templates";

/**
 * ==========================================================
 * Prompt Optimizer
 * ==========================================================
 *
 * Nhiệm vụ:
 *
 * - giảm token
 * - loại bỏ dữ liệu null
 * - loại bỏ object rỗng
 * - serialize object
 * - ghép Prompt
 *
 * Không gọi AI.
 *
 * ==========================================================
 */

export class PromptOptimizer {

    optimize(

        variables: PromptVariables

    ): string {

        return [

            PromptTemplates.SYSTEM,

            this.inject(

                PromptTemplates.PLANNING_CONTEXT,

                "planningContext",

                this.serialize(

                    variables.planningContext

                )

            ),

            this.inject(

                PromptTemplates.VALIDATION,

                "validation",

                this.serialize(

                    variables.validation

                )

            ),

            this.inject(

                PromptTemplates.REFLECTION,

                "suggestions",

                this.serialize(

                    variables.suggestions

                )

            ),

            this.inject(

                PromptTemplates.REPAIR,

                "repairs",

                this.serialize(

                    variables.repairs

                )

            ),

            PromptTemplates.OUTPUT

        ]

        .join("\n");

    }

    /**
     * --------------------------------------------
     * Inject variable
     * --------------------------------------------
     */

    private inject(

        template: string,

        variable: string,

        value: string

    ): string {

        return template.replace(

            `{{${variable}}}`,

            value

        );

    }

    /**
     * --------------------------------------------
     * Serialize
     * --------------------------------------------
     */

    private serialize(

        value: unknown

    ): string {

        return JSON.stringify(

            this.clean(value),

            null,

            2

        );

    }

    /**
     * --------------------------------------------
     * Remove null / undefined recursively
     * --------------------------------------------
     */

    private clean(

        value: unknown

    ): unknown {

        if (

            value === null ||

            value === undefined

        ) {

            return undefined;

        }

        if (

            Array.isArray(value)

        ) {

            return value

                .map(

                    item =>

                        this.clean(item)

                )

                .filter(

                    item =>

                        item !== undefined

                );

        }

        if (

            typeof value === "object"

        ) {

            const result:

                Record<string, unknown> = {};

            for (

                const [key, val]

                of Object.entries(

                    value as Record<string, unknown>

                )

            ) {

                const cleaned =

                    this.clean(val);

                if (

                    cleaned !== undefined

                ) {

                    result[key] = cleaned;

                }

            }

            return result;

        }

        return value;

    }

}