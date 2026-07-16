import { BaseService } from "./base.service";

import { PlanningRequest }
from "../../planning/models/planning-request.model";

import {
    HotelPlan,
    HotelSummary
}
from "../../planning/models/planning-context.model";

import { HotelRepository }
from "../../repositories/hotel.repository";

export class HotelService
extends BaseService<PlanningRequest, HotelPlan> {

    constructor(

        private repository: HotelRepository

    ) {

        super();

    }

    async plan(

        request: PlanningRequest

    ): Promise<HotelPlan> {

        const hotels: HotelSummary[] =
            this.repository.findHotels(

                request.destination

            );

        return {

            recommendedHotels: hotels,

            selectedHotel:

                hotels.length > 0

                    ? hotels[0]

                    : undefined

        };

    }

}