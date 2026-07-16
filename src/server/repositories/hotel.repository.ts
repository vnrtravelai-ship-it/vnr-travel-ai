import { HotelProvider }
from "../providers/hotel/hotel.provider";

import {
    HotelSummary
} from "../planning/models/planning-context.model";

export class HotelRepository {

    constructor(

        private provider: HotelProvider

    ) { }

    findHotels(

        location: string

    ): HotelSummary[] {

        return this.provider.findHotels(

            location

        );

    }

}