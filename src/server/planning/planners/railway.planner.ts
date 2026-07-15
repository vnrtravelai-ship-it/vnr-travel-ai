import { PlanningRequest } from "../models/planning-request.model";
import { RailwayPlan } from "../models/planning-context.model";

import { RailwayRepository } from "../../repositories/railway.repository";

const repository = new RailwayRepository();

export class RailwayPlanner {

    async plan(
        request: PlanningRequest
    ): Promise<RailwayPlan> {

        const route =
            repository.findRoute(

                request.departure,

                request.destination

            );

        return {

            trainCode:
                route?.trainCode ?? "",

            departureStation:
                request.departure,

            arrivalStation:
                request.destination,

            departureTime:
                route?.departureTime ?? "",

            arrivalTime:
                route?.arrivalTime ?? "",

            seatType:
                route?.seatType ?? "",

            estimatedPrice:
                route?.estimatedPrice ?? 0,

            duration:
                route?.duration ?? "",

            distanceKm:
                route?.distanceKm ?? 0,

        };

    }

}