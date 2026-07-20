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

    validate(
        context: PlanningContext
    ): ConstraintError[] {

        const errors: ConstraintError[] = [];

        const itinerary =
            context.itinerary;

        if (

            !itinerary ||
            itinerary.length === 0

        ) {

            return errors;

        }

        /**
         * Sprint 3.9:
         * DayPlan hiện chưa có:
         *  - startTime
         *  - endTime
         *  - location
         *
         * Vì vậy chưa thể kiểm tra thời gian chuyển tiếp.
         *
         * Rule này được giữ lại như một extension point.
         * Sprint 4 sẽ bổ sung:
         *  - Activity[]
         *  - TimeSlot
         *  - Transfer validation
         */

        for (

            let i = 0;

            i < itinerary.length;

            i++

        ) {

            const day =
                itinerary[i];

            if (

                day.day <= 0

            ) {

                errors.push({

                    code:
                        "INVALID_ITINERARY_DAY",

                    message:
                        "Invalid itinerary day.",

                    severity:
                        "ERROR",

                    source:
                        "TRANSFER",

                    field:
                        `itinerary[${i}].day`,

                    details: {

                        day:
                            day.day

                    }

                });

            }

        }

        return errors;

    }

}