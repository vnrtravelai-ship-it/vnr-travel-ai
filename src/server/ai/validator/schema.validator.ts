/**
 * =====================================================
 * Schema Validator
 * Sprint 4.7
 * =====================================================
 */

export interface SchemaValidationResult {

    valid: boolean;

    errors: string[];

}

export class SchemaValidator {

    validate<T>(

        value: unknown,

        requiredFields: (keyof T)[]

    ): SchemaValidationResult {

        const errors: string[] = [];

        if (

            value === null ||

            typeof value !== "object"

        ) {

            return {

                valid: false,

                errors: [

                    "Payload is not an object."

                ]

            };

        }

        const record =

            value as Record<string, unknown>;

        for (

            const field of requiredFields

        ) {

            if (

                !(field as string in record)

            ) {

                errors.push(

                    `Missing required field: ${String(field)}`

                );

            }

        }

        return {

            valid:

                errors.length === 0,

            errors

        };

    }

}