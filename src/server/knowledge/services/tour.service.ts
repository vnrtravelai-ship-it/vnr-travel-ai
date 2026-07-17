import { BaseService }
from "./base.service";

import {
    PlanningRequest
}
from "../../planning/models/planning-request.model";

import {
    TourPlan
}
from "../../planning/models/planning-context.model";

import {
    TourRepository
}
from "../../repositories/tour.repository";

export class TourService
extends BaseService<PlanningRequest, TourPlan[]> {

    constructor(

        private repository: TourRepository

    ) {

        super();

    }

    async plan(

        request: PlanningRequest

    ): Promise<TourPlan[]> {

        return this.repository.findByCity(

            request.destination

        );

    }

}