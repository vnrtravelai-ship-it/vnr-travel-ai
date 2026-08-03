/* ============================================================
 * VNR Travel AI
 * Railway Data Source
 * ------------------------------------------------------------
 * Single source of truth for railway knowledge.
 * Sprint 5.2
 * ============================================================
 */

import {
    RailwayTrain,
    RailwayRoute,
    railwayTrains,
    railwayRoutes
}
from "../planning/knowledge/railway.knowledge";

export class RailwayDataSource {

    private static instance: RailwayDataSource;

    private readonly trains: RailwayTrain[];

    private readonly routes: RailwayRoute[];

    private constructor() {

        this.trains = railwayTrains;

        this.routes = railwayRoutes;

    }

    static getInstance(): RailwayDataSource {

        if (!RailwayDataSource.instance) {

            RailwayDataSource.instance =
                new RailwayDataSource();

        }

        return RailwayDataSource.instance;

    }

    /**
     * Danh sách toàn bộ đoàn tàu.
     */
    getAllTrains(): RailwayTrain[] {

        return this.trains;

    }

    /**
     * Danh sách toàn bộ tuyến.
     */
    getAllRoutes(): RailwayRoute[] {

        return this.routes;

    }

    /**
     * Tìm tàu theo mã.
     */
    findTrainByCode(
        trainCode: string
    ): RailwayTrain | undefined {

        return this.trains.find(

            train =>

                train.trainCode === trainCode

        );

    }

    /**
     * Tìm tàu theo tuyến.
     */
    findTrainByRoute(
        departure: string,
        destination: string
    ): RailwayTrain | undefined {

        return this.trains.find(

            train =>

                train.departure === departure &&

                train.destination === destination

        );

    }

    /**
     * Tìm thông tin tuyến.
     */
    findRoute(
        departure: string,
        destination: string
    ): RailwayRoute | undefined {

        return this.routes.find(

            route =>

                route.departure === departure &&

                route.destination === destination

        );

    }

}