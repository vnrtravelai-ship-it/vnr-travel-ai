import { ConstraintError }
    from "../models/constraint-error.model";

import {
    ReflectionSuggestion,
    ReflectionPriority
}
    from "./reflection.types";

export class ReflectionBuilder {

    build(
        error: ConstraintError
    ): ReflectionSuggestion {

        return {

            code: error.code,

            title: this.createTitle(error),

            description: error.message,

            instruction: this.createInstruction(error),

            priority: this.mapPriority(error.severity)

        };

    }

    /**
     * ------------------------------------
     * Reflection Title
     * ------------------------------------
     */

    private createTitle(
        error: ConstraintError
    ): string {

        switch (error.code) {

            case "BUDGET_OVERFLOW":
                return "Budget exceeded";

            case "HOTEL_INVALID_STAY_PERIOD":
                return "Invalid hotel stay";

            case "HOTEL_CHECKIN_BEFORE_ARRIVAL":
                return "Hotel check-in conflict";

            case "HOTEL_CHECKIN_TIME_MISSING":
                return "Missing hotel check-in";

            case "HOTEL_CHECKOUT_TIME_MISSING":
                return "Missing hotel check-out";

            case "SCHEDULE_OVERLAP":
                return "Schedule overlap";

            case "SCHEDULE_INVALID_DURATION":
                return "Invalid activity duration";

            case "TRANSFER_TIME_TOO_SHORT":
                return "Transfer time too short";

            case "DUPLICATE_ACTIVITY":
                return "Duplicate activity";

            case "DUPLICATE_SCHEDULE_ID":
                return "Duplicate schedule";

            default:
                return error.message;

        }

    }

    /**
     * ------------------------------------
     * Reflection Instruction
     * ------------------------------------
     */

    private createInstruction(
        error: ConstraintError
    ): string {

        switch (error.code) {

            case "BUDGET_OVERFLOW":
                return "Reduce total itinerary cost until it fits within the user's budget without removing essential activities.";

            case "HOTEL_INVALID_STAY_PERIOD":
                return "Ensure hotel check-out occurs after check-in.";

            case "HOTEL_CHECKIN_BEFORE_ARRIVAL":
                return "Move hotel check-in to a time after railway arrival.";

            case "HOTEL_CHECKIN_TIME_MISSING":
                return "Provide a valid hotel check-in time.";

            case "HOTEL_CHECKOUT_TIME_MISSING":
                return "Provide a valid hotel check-out time.";

            case "SCHEDULE_OVERLAP":
                return "Adjust activities so that no schedule overlap exists.";

            case "SCHEDULE_INVALID_DURATION":
                return "Ensure activity end time occurs after start time.";

            case "TRANSFER_TIME_TOO_SHORT":
                return "Increase transfer time between two consecutive activities.";

            case "DUPLICATE_ACTIVITY":
                return "Remove duplicated activities from the itinerary.";

            case "DUPLICATE_SCHEDULE_ID":
                return "Ensure every schedule item has a unique identifier.";

            default:
                return error.message;

        }

    }

    /**
     * ------------------------------------
     * Priority Mapping
     * ------------------------------------
     */

    private mapPriority(
        severity: ConstraintError["severity"]
    ): ReflectionPriority {

        switch (severity) {

            case "ERROR":
                return "HIGH";

            case "WARNING":
                return "MEDIUM";

            case "INFO":
                return "LOW";

            default:
                return "LOW";

        }

    }

}