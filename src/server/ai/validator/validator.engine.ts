import { OutputValidator }
    from "./output.validator";

/**
 * =====================================================
 * Validator Engine Result
 * =====================================================
 */

export interface ValidatorEngineResult<T = unknown> {

    /**
     * Validation status.
     */

    success: boolean;

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
 * Validator Engine
 * =====================================================
 *
 * Pipeline
 *
 * AI Response
 *      ↓
 * JSON Validator
 *      ↓
 * Schema Validator
 *      ↓
 * Final Object
 *
 * =====================================================
 */

export class ValidatorEngine {

    private readonly validator =
        new OutputValidator();

    validate<T>(

        raw: string,

        requiredFields: (keyof T)[]

    ): ValidatorEngineResult<T> {

        const result =

            this.validator.validate<T>(

                raw,

                requiredFields

            );

        if (

            !result.valid

        ) {

            return {

                success: false,

                errors:

                    result.errors

            };

        }

        return {

            success: true,

            data:

                result.data,

            errors: []

        };

    }

}