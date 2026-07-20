import { PlanningContext }
    from "../../planning/models/planning-context.model";

import { ConstraintRule }
    from "../models/constraint-rule.model";

import { ConstraintError }
    from "../models/constraint-error.model";

export class HotelRule
    implements ConstraintRule {

    readonly name =
        "HotelRule";

    validate(
        context: PlanningContext
    ): ConstraintError[] {

        const errors: ConstraintError[] = [];

        const hotel =
            context.hotel;

        if (!hotel) {

            return errors;

        }

        // =====================================
        // Check-in time
        // =====================================

        if (!hotel.checkInTime) {

            errors.push({

                code:
                    "HOTEL_CHECKIN_TIME_MISSING",

                message:
                    "Hotel check-in time is missing.",

                severity:
                    "ERROR",

                source:
                    "HOTEL",

                field:
                    "hotel.checkInTime"

            });

        }

        // =====================================
        // Check-out time
        // =====================================

        if (!hotel.checkOutTime) {

            errors.push({

                code:
                    "HOTEL_CHECKOUT_TIME_MISSING",

                message:
                    "Hotel check-out time is missing.",

                severity:
                    "ERROR",

                source:
                    "HOTEL",

                field:
                    "hotel.checkOutTime"

            });

        }

        // =====================================
        // Check-in after train arrival
        // =====================================

        if (

            context.railway?.arrivalTime &&
            hotel.checkInTime

        ) {

            const arrival =
                new Date(
                    context.railway.arrivalTime
                );

            const checkIn =
                new Date(
                    hotel.checkInTime
                );

            if (
                checkIn < arrival
            ) {

                errors.push({

                    code:
                        "HOTEL_CHECKIN_BEFORE_ARRIVAL",

                    message:
                        "Hotel check-in cannot occur before train arrival.",

                    severity:
                        "ERROR",

                    source:
                        "HOTEL",

                    field:
                        "hotel.checkInTime",

                    details: {

                        arrival:
                            context.railway.arrivalTime,

                        checkIn:
                            hotel.checkInTime

                    }

                });

            }

        }

        // =====================================
        // Check-out after check-in
        // =====================================

        if (

            hotel.checkInTime &&
            hotel.checkOutTime

        ) {

            const checkIn =
                new Date(
                    hotel.checkInTime
                );

            const checkOut =
                new Date(
                    hotel.checkOutTime
                );

            if (
                checkOut <= checkIn
            ) {

                errors.push({

                    code:
                        "HOTEL_INVALID_STAY_PERIOD",

                    message:
                        "Hotel check-out must be after check-in.",

                    severity:
                        "ERROR",

                    source:
                        "HOTEL",

                    field:
                        "hotel.checkOutTime",

                    details: {

                        checkIn:
                            hotel.checkInTime,

                        checkOut:
                            hotel.checkOutTime

                    }

                });

            }

        }

        return errors;

    }

}