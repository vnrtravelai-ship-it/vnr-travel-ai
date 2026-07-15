import fs from "fs";
import path from "path";

export interface RailwayRoute {

    departure: string;

    arrival: string;

    distanceKm: number;

    duration: string;

    seatType: string;

    estimatedPrice: number;

    trainCode: string;

    departureTime: string;

    arrivalTime: string;

}

export class RailwayRepository {

    private routes: RailwayRoute[];

    constructor() {

        const filePath = path.join(
            process.cwd(),
            "src/server/planning/data/railway-data.json"
        );

        const json = fs.readFileSync(
            filePath,
            "utf8"
        );

        this.routes = JSON.parse(json);

    }

    findRoute(
        departure: string,
        arrival: string
    ): RailwayRoute | undefined {

        return this.routes.find(route =>

            route.departure === departure &&
            route.arrival === arrival

        );

    }

}