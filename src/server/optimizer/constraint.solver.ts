import { PlanningContext }
    from "../planning/models/planning-context.model";

import { ConstraintRule }
    from "./models/constraint-rule.model";

import { ConstraintResult }
    from "./models/constraint-result.model";

import { ConstraintError }
    from "./models/constraint-error.model";

import { BudgetRule }
    from "./rules/budget.rule";

import { RailwayRule }
    from "./rules/railway.rule";

import { HotelRule }
    from "./rules/hotel.rule";

import { ScheduleRule }
    from "./rules/schedule.rule";

import { TransferRule }
    from "./rules/transfer.rule";

import { DuplicateRule }
    from "./rules/duplicate.rule";

export class ConstraintSolver {

    private readonly rules: ConstraintRule[] = [

        new BudgetRule(),

        new RailwayRule(),

        new HotelRule(),

        new ScheduleRule(),

        new TransferRule(),

        new DuplicateRule()

    ];

    validate(
        context: PlanningContext
    ): ConstraintResult {

        const errors: ConstraintError[] = [];

        const warnings: ConstraintError[] = [];

        for (const rule of this.rules) {

            const result = rule.validate(context);

            for (const error of result) {

                if (error.severity === "WARNING") {

                    warnings.push(error);

                }

                else {

                    errors.push(error);

                }

            }

        }

        return {

            valid:

                errors.length === 0,

            errorCount:

                errors.length,

            errors,

            warnings,

            generatedAt:

                new Date()

        };

    }

}