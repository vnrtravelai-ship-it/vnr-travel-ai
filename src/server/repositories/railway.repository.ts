import {
    RailwayProvider
} from "../providers/railway/railway.provider";

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

    constructor(

        private provider: RailwayProvider

    ) { }

    findRoute(

        departure: string,

        arrival: string

    ): RailwayRoute | undefined {

        return this.provider.findRoute(

            departure,

            arrival

        );

    }

}