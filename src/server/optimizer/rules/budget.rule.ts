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
            context.preferences?.budget == null
        ) {

            return errors;

        }

        if (
            context.budget == null
        ) {

            return errors;

        }

        const maxBudget =
            context.preferences.budget;

        const totalBudget =
            context.budget.totalCost;

        if (
            totalBudget > maxBudget
        ) {

            errors.push({

                code:
                    "BUDGET_OVERFLOW",

                message:
                    "Total itinerary cost exceeds the user's budget.",

                severity:
                    "ERROR",

                source:
                    "BUDGET",

                field:
                    "budget.totalCost",

                details: {

                    maximum:
                        maxBudget,

                    actual:
                        totalBudget,

                    exceeded:

                        totalBudget - maxBudget

                }

            });

        }

        return errors;

    }

}