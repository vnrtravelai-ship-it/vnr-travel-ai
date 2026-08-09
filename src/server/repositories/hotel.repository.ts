import { BaseRepository }
from "./base.repository";

import {
    HotelSummary
}
from "../planning/models/planning-context.model";

import {
    HotelDataSource
}
from "../datasources/hotel.datasource";

type HotelRecord =
    HotelSummary & {
        city: string;
    };

export class HotelRepository
extends BaseRepository<HotelRecord> {

    private readonly datasource:
        HotelDataSource;

    constructor() {

        const datasource =
            HotelDataSource.getInstance();

        const hotels =
            datasource.getAll().map(
                hotel =>
                    hotel as HotelRecord
            );

        super(hotels);

        this.datasource =
            datasource;

    }

    findHotels(
        location: string
    ): HotelSummary[] {

        const normalizedLocation =
            location
                .trim()
                .toLowerCase();

        return this.findMany(
            hotel =>
                hotel.city
                    .trim()
                    .toLowerCase()
                    === normalizedLocation
        );

    }

    findById(
        id: string
    ): HotelSummary | undefined {

        return this.datasource
            .getAll()
            .find(
                hotel =>
                    hotel.id === id
            );

    }

}