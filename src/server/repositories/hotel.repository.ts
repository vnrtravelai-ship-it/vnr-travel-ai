import fs from "fs";
import path from "path";

export interface Hotel {

    id: string;

    city: string;

    name: string;

    stars: number;

    priceFrom: number;

    address: string;

    latitude: number;

    longitude: number;

}

export class HotelRepository {

    private hotels: Hotel[];

    constructor() {

        const filePath = path.join(
            process.cwd(),
            "src/server/planning/data/hotels.json"
        );

        const json = fs.readFileSync(
            filePath,
            "utf8"
        );

        this.hotels = JSON.parse(json);

    }

    findByCity(
        city: string
    ): Hotel[] {

        return this.hotels.filter(
            hotel => hotel.city === city
        );

    }

    getAll(): Hotel[] {

        return this.hotels;

    }

}