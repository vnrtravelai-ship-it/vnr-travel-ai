import { ConstraintResult }
    from "./models/constraint-result.model";

import { JsonValidationResult }
    from "./json.validator";

export interface AIQualityReport {

    /**
     * Final quality score (0–100)
     */
    score: number;

    /**
     * Whether the result is acceptable.
     */
    passed: boolean;

    /**
     * Detailed evaluation.
     */
    details: {

        validationScore: number;

        constraintScore: number;

        completenessScore: number;

    };

    /**
     * Human-readable issues.
     */
    issues: string[];

}

export class AIQualityScorer {

    score(

        validation: JsonValidationResult,

        constraints: ConstraintResult

    ): AIQualityReport {

        let score = 100;

        const issues: string[] = [];

        // ------------------------------------
        // JSON Validation
        // ------------------------------------

        let validationScore = 100;

        if (!validation.valid) {

            validationScore =

                Math.max(

                    0,

                    100 -

                    validation.errors.length * 20

                );

            score -=

                validation.errors.length * 20;

            issues.push(

                ...validation.errors

            );

        }

        // ------------------------------------
        // Constraint Errors
        // ------------------------------------

        let constraintScore = 100;

        if (

            constraints.errors.length > 0

        ) {

            constraintScore =

                Math.max(

                    0,

                    100 -

                    constraints.errors.length * 15

                );

            score -=

                constraints.errors.length * 15;

            constraints.errors.forEach(

                error =>

                    issues.push(

                        error.code

                    )

            );

        }

        // ------------------------------------
        // Completeness
        // ------------------------------------

        const completenessScore =

            validation.valid

            ? 100

            : 60;

        score =

            Math.max(

                0,

                Math.min(

                    score,

                    100

                )

            );

        return {

            score,

            passed:

                score >= 80,

            details: {

                validationScore,

                constraintScore,

                completenessScore

            },

            issues

        };

    }

}