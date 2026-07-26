import { PlanningRequest } from "../models/planning-request.model";

import {
    TourPlan
} from "../models/planning-context.model";

import {
    TourRepository
} from "../../repositories/tour.repository";

export class TourPlanner {

    constructor(

        private readonly repository: TourRepository

    ) {}

    async plan(
        request: PlanningRequest
    ): Promise<TourPlan[]> {

        return this.repository.findByCity(

            request.destination

        );

    }

}