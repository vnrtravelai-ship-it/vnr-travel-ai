import { BaseService } from "./base.service";

import { PlanningRequest }
from "../../planning/models/planning-request.model";

import { RailwayPlan }
from "../../planning/models/planning-context.model";

import { RailwayRepository }
from "../../repositories/railway.repository";

export class RailwayService
extends BaseService<PlanningRequest, RailwayPlan> {

    constructor(
        private repository: RailwayRepository
    ) {
        super();
    }

    async plan(
        request: PlanningRequest
    ): Promise<RailwayPlan> {

        const route =
            this.repository.findRoute(
                request.departure,
                request.destination
            );

        const train =
            this.repository.findTrain(
                request.departure,
                request.destination
            );

        return {

            trainCode: train?.trainCode ?? "",

            departureStation: request.departure,

            arrivalStation: request.destination,

            departureTime: train?.departureTime ?? "",

            arrivalTime: train?.arrivalTime ?? "",

            seatType: train?.seatType ?? "",

            estimatedPrice:
                train?.estimatedPrice ?? 0,

            duration:
                train?.duration ?? "",

            distanceKm:
                route?.distanceKm ?? 0,

        };

    }

}