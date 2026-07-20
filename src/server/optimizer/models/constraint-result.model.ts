import { ConstraintError }
    from "./constraint-error.model";

export interface ConstraintResult {

    /**
     * Overall validation result.
     */
    valid: boolean;

    /**
     * Total number of detected issues.
     */
    errorCount: number;

    /**
     * Validation errors.
     */
    errors: ConstraintError[];

    /**
     * Optional warnings.
     */
    warnings: ConstraintError[];

    /**
     * Validation timestamp.
     */
    generatedAt: Date;

}