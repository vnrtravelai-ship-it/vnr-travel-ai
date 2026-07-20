export interface ConstraintError {

    /**
     * Error code
     * Example:
     * PLN_001
     * BUDGET_OVERFLOW
     */
    code: string;

    /**
     * Human readable message
     */
    message: string;

    /**
     * Severity
     */
    severity:

        | "INFO"

        | "WARNING"

        | "ERROR";

    /**
     * Module that produced the error
     */
    source:

        | "BUDGET"

        | "RAILWAY"

        | "HOTEL"

        | "SCHEDULE"

        | "TRANSFER"

        | "DUPLICATE"

        | "SYSTEM";

    /**
     * Optional field
     * Example:
     * budget.total
     */
    field?: string;

    /**
     * Additional information
     */
    details?: Record<string, unknown>;

}