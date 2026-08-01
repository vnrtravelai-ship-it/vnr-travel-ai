import { BaseRepository } from "./base.repository";

import {
    RailwayTrain,
    RailwayRoute,
    railwayTrains,
    railwayRoutes
} from "../planning/knowledge/railway.knowledge";

export class RailwayRepository
    extends BaseRepository<RailwayTrain> {

    /**
     * Danh sách tuyến đường
     */
    private readonly routes: RailwayRoute[];

    constructor() {

        super(railwayTrains);

        this.routes = railwayRoutes;

    }

    /**
     * Lấy toàn bộ đoàn tàu
     */
    findAllTrains(): RailwayTrain[] {

        return this.findAll();

    }

    /**
     * Tìm theo mã tàu
     */
    findByTrainCode(
        trainCode: string
    ): RailwayTrain | undefined {

        return this.findOne(

            train =>

                train.trainCode === trainCode

        );

    }

    /**
     * Tìm tất cả tàu theo tuyến
     */
    findByRoute(

    departure: string,

    destination: string

): RailwayTrain | undefined {

    return this.findOne(

        train =>

            train.departure === departure &&

            train.destination === destination

    );

}

    /**
     * Backward compatibility
     * RailwayService hiện đang gọi findRoute()
     */
    findRoute(

    departure: string,

    destination: string

): RailwayTrain | undefined {

    return this.findByRoute(

        departure,

        destination

    );

}

    /**
     * Lấy thông tin tuyến
     */
    findRouteInfo(

        departure: string,

        destination: string

    ): RailwayRoute | undefined {

        return this.routes.find(

            route =>

                route.departure === departure &&

                route.destination === destination

        );

    }

    /**
     * Có tuyến hay không
     */
    hasRoute(

        departure: string,

        destination: string

    ): boolean {

        return this.findRouteInfo(

            departure,

            destination

        ) !== undefined;

    }

    /**
     * Khoảng cách tuyến
     */
    getDistance(

        departure: string,

        destination: string

    ): number {

        return (

            this.findRouteInfo(

                departure,

                destination

            )?.distanceKm ?? 0

        );

    }

}