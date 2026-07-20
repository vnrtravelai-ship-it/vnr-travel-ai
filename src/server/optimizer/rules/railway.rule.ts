import { PlanningContext }
    from "../../planning/models/planning-context.model";

import { ConstraintRule }
    from "../models/constraint-rule.model";

import { ConstraintError }
    from "../models/constraint-error.model";

export class RailwayRule
    implements ConstraintRule {

    readonly name =
        "RailwayRule";

    validate(
        context: PlanningContext
    ): ConstraintError[] {

        const errors: ConstraintError[] = [];

        const railway =
            context.railway;

        if (!railway) {

            return errors;

        }

        // =====================================
        // Arrival must exist
        // =====================================

        if (
            !railway.arrivalStation
        ) {

            errors.push({

                code:
                    "RAILWAY_ARRIVAL_STATION_MISSING",

                message:
                    "Arrival station is missing.",

                severity:
                    "ERROR",

                source:
                    "RAILWAY",

                field:
                    "railway.arrivalStation"

            });

        }

        // =====================================
        // Arrival time must exist
        // =====================================

        if (
            !railway.arrivalTime
        ) {

            errors.push({

                code:
                    "RAILWAY_ARRIVAL_TIME_MISSING",

                message:
                    "Arrival time is missing.",

                severity:
                    "ERROR",

                source:
                    "RAILWAY",

                field:
                    "railway.arrivalTime"

            });

        }

        // =====================================
        // Departure time must exist
        // =====================================

        if (
            !railway.departureTime
        ) {

            errors.push({

                code:
                    "RAILWAY_DEPARTURE_TIME_MISSING",

                message:
                    "Departure time is missing.",

                severity:
                    "ERROR",

                source:
                    "RAILWAY",

                field:
                    "railway.departureTime"

            });

        }

        // =====================================
        // Arrival must be after departure
        // =====================================

        if (

            railway.departureTime &&
            railway.arrivalTime

        ) {

            const departure =
                new Date(railway.departureTime);

            const arrival =
                new Date(railway.arrivalTime);

            if (
                arrival <= departure
            ) {

                errors.push({

                    code:
                        "RAILWAY_INVALID_TIMELINE",

                    message:
                        "Arrival time must be after departure time.",

                    severity:
                        "ERROR",

                    source:
                        "RAILWAY",

                    field:
                        "railway.arrivalTime",

                    details: {

                        departure:
                            railway.departureTime,

                        arrival:
                            railway.arrivalTime

                    }

                });

            }

        }

        return errors;

    }

}