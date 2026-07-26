import { PlanningRequest } from "../models/planning-request.model";

import {
    HotelPlan,
    HotelSummary
} from "../models/planning-context.model";

import {
    HotelRepository
} from "../../repositories/hotel.repository";

export class HotelPlanner {

    constructor(

        private readonly repository: HotelRepository

    ) {}

    async plan(
        request: PlanningRequest
    ): Promise<HotelPlan> {

        const recommendedHotels: HotelSummary[] =
            this.repository.findHotels(

                request.destination

            );

        return {

            recommendedHotels,

            selectedHotel:

                recommendedHotels.length > 0

                    ? recommendedHotels[0]

                    : undefined

        };

    }

}