import { PlanningContext }
    from "../../planning/models/planning-context.model";

import { ConstraintRule }
    from "../models/constraint-rule.model";

import { ConstraintError }
    from "../models/constraint-error.model";

export class DuplicateRule
    implements ConstraintRule {

    readonly name =
        "DuplicateRule";

    validate(
        context: PlanningContext
    ): ConstraintError[] {

        const errors: ConstraintError[] = [];

        if (
            !context.itinerary ||
            context.itinerary.length <= 1
        ) {

            return errors;

        }

        const daySet =
            new Set<number>();

        for (
            let i = 0;
            i < context.itinerary.length;
            i++
        ) {

            const day =
                context.itinerary[i];

            if (
                daySet.has(day.day)
            ) {

                errors.push({

                    code:
                        "DUPLICATE_DAY",

                    message:
                        "Duplicate itinerary day detected.",

                    severity:
                        "ERROR",

                    source:
                        "DUPLICATE",

                    field:
                        `itinerary[${i}].day`,

                    details: {

                        day:
                            day.day

                    }

                });

            }

            else {

                daySet.add(
                    day.day
                );

            }

        }

        return errors;

    }

}