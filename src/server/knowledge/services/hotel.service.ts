import { BaseService } from "./base.service";

import { PlanningRequest } from "../../planning/models/planning-request.model";

import {
    HotelPlan,
    HotelSummary
} from "../../planning/models/planning-context.model";

import { HotelRepository } from "../../repositories/hotel.repository";

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

        const hotels = this.repository.findByCity(
            request.destination
        );

        const recommendedHotels: HotelSummary[] = hotels.map(hotel => ({

            id: hotel.id,

            name: hotel.name,

            stars: hotel.stars,

            priceFrom: hotel.priceFrom,

            address: hotel.address,

        }));

        return {

            recommendedHotels,

            selectedHotel:
                recommendedHotels.length > 0
                    ? recommendedHotels[0]
                    : undefined,

        };

    }

}