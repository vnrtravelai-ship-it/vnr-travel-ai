import { PlanningContext }
    from "../../planning/models/planning-context.model";

import { ConstraintRule }
    from "../models/constraint-rule.model";

import { ConstraintError }
    from "../models/constraint-error.model";

export class TransferRule
    implements ConstraintRule {

    readonly name =
        "TransferRule";

    /**
     * Minimum transfer time (minutes)
     */
    private readonly MIN_TRANSFER_MINUTES = 15;

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

            i < sorted.length - 1;

            i++

        ) {

            const current =
                sorted[i];

            const next =
                sorted[i + 1];

            if (

                !current.endTime ||
                !next.startTime

            ) {

                continue;

            }

            const currentEnd =
                new Date(current.endTime);

            const nextStart =
                new Date(next.startTime);

            const transferMinutes =

                (
                    nextStart.getTime()

                    -

                    currentEnd.getTime()

                ) / 60000;

            /**
             * Ignore if same location
             */

            if (

                current.location &&
                next.location &&
                current.location === next.location

            ) {

                continue;

            }

            /**
             * Not enough transfer time
             */

            if (

                transferMinutes < this.MIN_TRANSFER_MINUTES

            ) {

                errors.push({

                    code:
                        "TRANSFER_TIME_TOO_SHORT",

                    message:
                        "Insufficient transfer time between activities.",

                    severity:
                        "ERROR",

                    source:
                        "TRANSFER",

                    field:
                        `schedule[${i}]`,

                    details: {

                        from:

                            current.location,

                        to:

                            next.location,

                        availableMinutes:

                            transferMinutes,

                        requiredMinutes:

                            this.MIN_TRANSFER_MINUTES,

                        currentActivity:

                            current.id,

                        nextActivity:

                            next.id

                    }

                });

            }

        }

        return errors;

    }

}