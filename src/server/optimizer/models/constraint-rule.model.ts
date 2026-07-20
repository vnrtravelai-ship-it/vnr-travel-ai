import { PlanningContext }
    from "../../planning/models/planning-context.model";

import { ConstraintError }
    from "./constraint-error.model";

export interface ConstraintRule {

    /**
     * Rule unique name.
     *
     * Example:
     * BudgetRule
     * RailwayRule
     */
    readonly name: string;

    /**
     * Executes validation.
     *
     * Returns validation errors.
     */
    validate(
        context: PlanningContext
    ): ConstraintError[];

}