import fs from "fs";
import path from "path";

import { BaseProvider }
from "../shared/base.provider";

import {
    HotelSummary
} from "../../planning/models/planning-context.model";

export class HotelProvider
extends BaseProvider<HotelSummary> {

    private hotels: HotelSummary[] = [];

    constructor() {

        super();

        const filePath =
            path.join(

                process.cwd(),

                "src/server/planning/data/hotels.json"

            );

        const json =
            fs.readFileSync(

                filePath,

                "utf8"

            );

        this.hotels =
            JSON.parse(json);

    }

    async load(): Promise<HotelSummary[]> {

        return this.hotels;

    }

    findHotels(

        location: string

    ): HotelSummary[] {

        return this.hotels.filter(hotel =>

            hotel.address
                .toLowerCase()
                .includes(

                    location.toLowerCase()

                )

        );

    }

}