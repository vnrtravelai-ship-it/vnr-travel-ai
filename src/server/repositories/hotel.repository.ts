import { BaseRepository } from "./base.repository";

import {
    HotelSummary
} from "../planning/models/planning-context.model";

export class HotelRepository
    extends BaseRepository<HotelSummary> {

    constructor() {

        super([]);

    }

    findHotels(

        location: string

    ): HotelSummary[] {

        return this.findMany(

            hotel =>

                hotel.address.includes(location)

        );

    }

    findById(

        id: string

    ): HotelSummary | undefined {

        return this.findOne(

            hotel =>

                hotel.id === id

        );

    }

}