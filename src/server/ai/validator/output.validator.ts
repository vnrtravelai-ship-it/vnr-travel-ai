import { JsonValidator }
    from "./json.validator";

import { SchemaValidator }
    from "./schema.validator";

/**
 * =====================================================
 * Output Validation Result
 * =====================================================
 */

export interface OutputValidationResult<T = unknown> {

    /**
     * Whether validation succeeded.
     */

    valid: boolean;

    /**
     * Parsed object.
     */

    data?: T;

    /**
     * Validation errors.
     */

    errors: string[];

}

/**
 * =====================================================
 * Output Validator
 * =====================================================
 *
 * Validate AI output:
 *
 * 1. JSON
 * 2. Schema
 *
 * =====================================================
 */

export class OutputValidator {

    private readonly jsonValidator =
        new JsonValidator();

    private readonly schemaValidator =
        new SchemaValidator();

    validate<T>(

        raw: string,

        requiredFields: (keyof T)[]

    ): OutputValidationResult<T> {

        const jsonResult =

            this.jsonValidator.validate(

                raw

            );

        if (

            !jsonResult.valid

        ) {

            return {

                valid: false,

                errors: [

                    jsonResult.error ??

                    "Invalid JSON."

                ]

            };

        }

        const schemaResult =

            this.schemaValidator.validate<T>(

                jsonResult.data,

                requiredFields

            );

        if (

            !schemaResult.valid

        ) {

            return {

                valid: false,

                errors:

                    schemaResult.errors

            };

        }

        return {

            valid: true,

            data:

                jsonResult.data as T,

            errors: []

        };

    }

}