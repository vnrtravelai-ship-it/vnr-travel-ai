import { BaseProvider }
from "../shared/base.provider";

import {
    HotelSummary
} from "../../planning/models/planning-context.model";

import {
    HotelDataSource
}
from "../../datasources/hotel.datasource";

export class HotelProvider
extends BaseProvider<HotelSummary> {

    private readonly datasource =
        HotelDataSource.getInstance();

    constructor() {

        super();

    }

    /**
     * Load toàn bộ khách sạn.
     */
    async load(): Promise<HotelSummary[]> {

        return this.datasource.getAll();

    }

    /**
     * Tìm khách sạn theo địa điểm.
     */
    findHotels(
        location: string
    ): HotelSummary[] {

        const keyword =
            location
                .trim()
                .toLowerCase();

        return this.datasource
            .getAll()
            .filter(

                hotel =>

                    hotel.address
                        ?.toLowerCase()
                        .includes(keyword)

            );

    }

}