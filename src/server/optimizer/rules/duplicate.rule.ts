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

        const schedule =
            context.schedule;

        if (
            !schedule ||
            schedule.length <= 1
        ) {

            return errors;

        }

        const idSet =
            new Set<string>();

        const activityKeySet =
            new Set<string>();

        for (

            let i = 0;

            i < schedule.length;

            i++

        ) {

            const slot =
                schedule[i];

            /**
             * Duplicate ID
             */

            if (

                idSet.has(slot.id)

            ) {

                errors.push({

                    code:
                        "DUPLICATE_SCHEDULE_ID",

                    message:
                        "Duplicate schedule id detected.",

                    severity:
                        "ERROR",

                    source:
                        "DUPLICATE",

                    field:
                        `schedule[${i}].id`,

                    details: {

                        id:
                            slot.id

                    }

                });

            }

            else {

                idSet.add(
                    slot.id
                );

            }

            /**
             * Duplicate Activity
             */

            const activityKey =

                [

                    slot.type,

                    slot.title,

                    slot.location,

                    slot.startTime

                ].join("|");

            if (

                activityKeySet.has(
                    activityKey
                )

            ) {

                errors.push({

                    code:
                        "DUPLICATE_ACTIVITY",

                    message:
                        "Duplicate activity detected.",

                    severity:
                        "WARNING",

                    source:
                        "DUPLICATE",

                    field:
                        `schedule[${i}]`,

                    details: {

                        title:
                            slot.title,

                        location:
                            slot.location,

                        startTime:
                            slot.startTime

                    }

                });

            }

            else {

                activityKeySet.add(
                    activityKey
                );

            }

        }

        return errors;

    }

}