import {
    RailwayTrain,
    RailwayRoute
} from "../../planning/knowledge/railway.knowledge";

import {
    RailwayDataSource
}
from "../../datasources/railway.datasource";

export class RailwayProvider {

    private readonly datasource =
        RailwayDataSource.getInstance();

    constructor() {}

    /**
     * Danh sách toàn bộ tàu.
     */
    getAllTrains(): RailwayTrain[] {

        return this.datasource.getAllTrains();

    }

    /**
     * Tìm theo mã tàu.
     */
    getTrainByCode(
        trainCode: string
    ): RailwayTrain | undefined {

        return this.datasource.findTrainByCode(
            trainCode
        );

    }

    /**
     * Tìm tàu theo tuyến.
     */
    getTrainByRoute(
        departure: string,
        destination: string
    ): RailwayTrain | undefined {

        return this.datasource.findTrainByRoute(
            departure,
            destination
        );

    }

    /**
     * Backward compatibility.
     */
    getRoute(
        departure: string,
        destination: string
    ): RailwayTrain | undefined {

        return this.getTrainByRoute(
            departure,
            destination
        );

    }

    /**
     * Thông tin tuyến.
     */
    getRouteInfo(
        departure: string,
        destination: string
    ): RailwayRoute | undefined {

        return this.datasource.findRoute(
            departure,
            destination
        );

    }

    /**
     * Kiểm tra tuyến.
     */
    hasRoute(
        departure: string,
        destination: string
    ): boolean {

        return this.getRouteInfo(
            departure,
            destination
        ) !== undefined;

    }

    /**
     * Khoảng cách tuyến.
     */
    getDistance(
        departure: string,
        destination: string
    ): number {

        return this.getRouteInfo(
            departure,
            destination
        )?.distanceKm ?? 0;

    }

}