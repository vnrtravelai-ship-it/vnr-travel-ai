import {
    railwayRoutes,
    railwayStations,
    railwayTrains,
} from "../planning/knowledge/railway.knowledge";

export class RailwayRepository {

    getStations() {
        return railwayStations;
    }

    getRoutes() {
        return railwayRoutes;
    }

    getTrains() {
        return railwayTrains;
    }

    findRoute(
        departure: string,
        destination: string
    ) {
        return railwayRoutes.find(
            r =>
                r.departure === departure &&
                r.destination === destination
        );
    }

    findTrain(
        departure: string,
        destination: string
    ) {
        return railwayTrains.find(
            t =>
                t.departure === departure &&
                t.destination === destination
        );
    }
}