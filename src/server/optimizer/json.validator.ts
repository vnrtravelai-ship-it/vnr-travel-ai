import {
    PlanningContext
} from "../planning/models/planning-context.model";

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

            return {

                valid: false,

                errors: [

                    "PlanningContext is null."

                ]

            };

        }

        const context =
            result as Partial<PlanningContext>;

        if (!context.request) {

            errors.push(

                "Missing request."

            );

        }

        if (!context.itinerary) {

            errors.push(

                "Missing itinerary."

            );

        }

        if (

            context.itinerary &&
            !Array.isArray(context.itinerary)

        ) {

            errors.push(

                "itinerary must be an array."

            );

        }

        if (!context.tours) {

            errors.push(

                "Missing tours."

            );

        }

        if (

            context.tours &&
            !Array.isArray(context.tours)

        ) {

            errors.push(

                "tours must be an array."

            );

        }

        if (!context.metadata) {

            errors.push(

                "Missing metadata."

            );

        }

        if (!context.budget) {

            errors.push(

                "Missing budget."

            );

        }

        return {

            valid:

                errors.length === 0,

            errors

        };

    }

}