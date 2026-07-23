/**
 * =====================================================
 * JSON Validator
 * Sprint 4.7
 * =====================================================
 */

export interface JsonValidationResult {

    valid: boolean;

    data?: unknown;

    error?: string;

}

export class JsonValidator {

    validate(

        raw: string

    ): JsonValidationResult {

        try {

            const data =

                JSON.parse(raw);

            return {

                valid: true,

                data

            };

        }

        catch (error) {

            return {

                valid: false,

                error:

                    error instanceof Error

                        ? error.message

                        : "Invalid JSON."

            };

        }

    }

}