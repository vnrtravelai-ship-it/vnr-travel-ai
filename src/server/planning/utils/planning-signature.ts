import { PlanningRequest } from "../models/planning-request.model";

export function buildPlanningSignature(
    request: PlanningRequest
): string {

    return [

        request.departure.trim().toUpperCase(),

        request.destination.trim().toUpperCase(),

        request.numberOfDays,

        request.budgetLevel.trim().toUpperCase(),

        request.travelStyle.trim().toUpperCase(),

    ].join("|");

}