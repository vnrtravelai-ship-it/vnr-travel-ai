import { PlanningContext }
    from "../../planning/models/planning-context.model";

import { ConstraintRule }
    from "../models/constraint-rule.model";

import { ConstraintError }
    from "../models/constraint-error.model";

export class BudgetRule
    implements ConstraintRule {

    readonly name =
        "BudgetRule";

    validate(
        context: PlanningContext
    ): ConstraintError[] {

        const errors: ConstraintError[] = [];

        if (
            context.budget == null
        ) {

            return errors;

        }

        if (
            context.budget.total < 0
        ) {

            errors.push({

                code:
                    "INVALID_BUDGET",

                message:
                    "Budget total cannot be negative.",

                severity:
                    "ERROR",

                source:
                    "BUDGET",

                field:
                    "budget.total",

                details: {

                    total:
                        context.budget.total

                }

            });

        }

        return errors;

    }

}