import { PlanningContext }
    from "../../planning/models/planning-context.model";

import { ConstraintRule }
    from "../models/constraint-rule.model";

import { ConstraintError }
    from "../models/constraint-error.model";

export class ScheduleRule
    implements ConstraintRule {

    readonly name =
        "ScheduleRule";

    validate(
        context: PlanningContext
    ): ConstraintError[] {

        const errors: ConstraintError[] = [];

        if (
            !context.itinerary ||
            context.itinerary.length === 0
        ) {

            errors.push({

                code:
                    "ITINERARY_EMPTY",

                message:
                    "Itinerary is empty.",

                severity:
                    "ERROR",

                source:
                    "SCHEDULE",

                field:
                    "itinerary"

            });

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

                day.day <= 0

            ) {

                errors.push({

                    code:
                        "INVALID_DAY",

                    message:
                        "Day index must be greater than zero.",

                    severity:
                        "ERROR",

                    source:
                        "SCHEDULE",

                    field:
                        `itinerary[${i}].day`

                });

            }

            if (

                daySet.has(day.day)

            ) {

                errors.push({

                    code:
                        "DUPLICATE_DAY",

                    message:
                        "Duplicate itinerary day.",

                    severity:
                        "WARNING",

                    source:
                        "SCHEDULE",

                    field:
                        `itinerary[${i}].day`

                });

            }

            daySet.add(day.day);

        }

        return errors;

    }

}