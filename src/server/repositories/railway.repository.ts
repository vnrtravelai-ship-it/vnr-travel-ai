import { BaseRepository } from "./base.repository";

import {
    RailwayTrain,
    RailwayRoute
} from "../planning/knowledge/railway.knowledge";

import {
    RailwayDataSource
} from "../datasources/railway.datasource";

export class RailwayRepository
extends BaseRepository<RailwayTrain> {

    /**
     * Railway DataSource
     */
    private readonly datasource: RailwayDataSource;

    /**
     * Danh sách tuyến
     */
    private readonly routes: RailwayRoute[];

    constructor() {

        const datasource =
            RailwayDataSource.getInstance();

        super(
            datasource.getAllTrains()
        );

        this.datasource = datasource;

        this.routes =
            datasource.getAllRoutes();

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

        return this.datasource.findTrainByCode(
            trainCode
        );

    }

    /**
     * Tìm theo tuyến
     */
    findByRoute(
        departure: string,
        destination: string
    ): RailwayTrain | undefined {

        return this.datasource.findTrainByRoute(
            departure,
            destination
        );

    }

    /**
     * Backward compatibility
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
     * Thông tin tuyến
     */
    findRouteInfo(
        departure: string,
        destination: string
    ): RailwayRoute | undefined {

        return this.datasource.findRoute(
            departure,
            destination
        );

    }

    /**
     * Có tuyến hay không
     */
    hasRoute(
        departure: string,
        destination: string
    ): boolean {

        return (
            this.findRouteInfo(
                departure,
                destination
            ) !== undefined
        );

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