import { ItineraryResult }
    from "../types/itinerary-result.model";

export interface JsonValidationResult {

    valid: boolean;

    errors: string[];

}

export class JsonValidator {

    validate(
        result: unknown
    ): JsonValidationResult {

        const errors: string[] = [];

        if (!result) {

            errors.push("Response is null.");

            return {

                valid: false,

                errors

            };

        }

        const itinerary = result as Partial<ItineraryResult>;

        if (!itinerary.tripName) {

            errors.push(

                "Missing tripName."

            );

        }

        if (!itinerary.days) {

            errors.push(

                "Missing days."

            );

        }

        if (

            itinerary.days &&
            !Array.isArray(itinerary.days)

        ) {

            errors.push(

                "days must be an array."

            );

        }

        if (!itinerary.budget) {

            errors.push(

                "Missing budget."

            );

        }

        if (!itinerary.summary) {

            errors.push(

                "Missing summary."

            );

        }

        return {

            valid:

                errors.length === 0,

            errors

        };

    }

}