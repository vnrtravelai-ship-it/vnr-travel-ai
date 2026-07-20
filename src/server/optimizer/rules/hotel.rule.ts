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

        if (

            !hotel.selectedHotel &&
            hotel.recommendedHotels.length === 0

        ) {

            errors.push({

                code:
                    "HOTEL_NOT_FOUND",

                message:
                    "No hotel recommendation available.",

                severity:
                    "WARNING",

                source:
                    "HOTEL",

                field:
                    "hotel"

            });

        }

        if (

            hotel.selectedHotel &&
            hotel.selectedHotel.priceFrom < 0

        ) {

            errors.push({

                code:
                    "HOTEL_INVALID_PRICE",

                message:
                    "Hotel price cannot be negative.",

                severity:
                    "ERROR",

                source:
                    "HOTEL",

                field:
                    "hotel.selectedHotel.priceFrom"

            });

        }

        return errors;

    }

}