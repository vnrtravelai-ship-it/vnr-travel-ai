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

        const schedule =
            context.schedule;

        if (
            !schedule ||
            schedule.length <= 1
        ) {

            return errors;

        }

        const sorted =
            [...schedule].sort(

                (a, b) =>

                    new Date(a.startTime).getTime()

                    -

                    new Date(b.startTime).getTime()

            );

        for (

            let i = 0;

            i < sorted.length;

            i++

        ) {

            const current =
                sorted[i];

            // ============================
            // Missing start time
            // ============================

            if (!current.startTime) {

                errors.push({

                    code:
                        "SCHEDULE_START_TIME_MISSING",

                    message:
                        "Activity start time is missing.",

                    severity:
                        "ERROR",

                    source:
                        "SCHEDULE",

                    field:
                        `schedule[${i}].startTime`

                });

            }

            // ============================
            // Missing end time
            // ============================

            if (!current.endTime) {

                errors.push({

                    code:
                        "SCHEDULE_END_TIME_MISSING",

                    message:
                        "Activity end time is missing.",

                    severity:
                        "ERROR",

                    source:
                        "SCHEDULE",

                    field:
                        `schedule[${i}].endTime`

                });

            }

            // ============================
            // End before start
            // ============================

            if (

                current.startTime &&
                current.endTime

            ) {

                const start =
                    new Date(current.startTime);

                const end =
                    new Date(current.endTime);

                if (

                    end < start

                ) {

                    errors.push({

                        code:
                            "SCHEDULE_INVALID_DURATION",

                        message:
                            "Activity end time must be after start time.",

                        severity:
                            "ERROR",

                        source:
                            "SCHEDULE",

                        field:
                            `schedule[${i}]`

                    });

                }

            }

            // ============================
            // Overlap
            // ============================

            if (

                i === sorted.length - 1

            ) {

                continue;

            }

            const next =
                sorted[i + 1];

            const currentEnd =
                new Date(current.endTime);

            const nextStart =
                new Date(next.startTime);

            if (

                currentEnd >

                nextStart

            ) {

                errors.push({

                    code:
                        "SCHEDULE_OVERLAP",

                    message:
                        "Activities overlap.",

                    severity:
                        "ERROR",

                    source:
                        "SCHEDULE",

                    field:
                        `schedule[${i}]`,

                    details: {

                        current:

                            current.id,

                        next:

                            next.id

                    }

                });

            }

        }

        return errors;

    }

}