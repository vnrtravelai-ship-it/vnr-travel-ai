import {
    RailwayTrain,
    RailwayRoute
} from "../../planning/knowledge/railway.knowledge";

import { RailwayRepository }
    from "../../repositories/railway.repository";

export class RailwayProvider {

    private readonly repository: RailwayRepository;

    constructor(
        repository?: RailwayRepository
    ) {

        this.repository =
            repository ?? new RailwayRepository();

    }

    /**
     * Danh sách toàn bộ tàu
     */
    getAllTrains(): RailwayTrain[] {

        return this.repository.findAllTrains();

    }

    /**
     * Tìm theo mã tàu
     */
    getTrainByCode(
        trainCode: string
    ): RailwayTrain | undefined {

        return this.repository.findByTrainCode(
            trainCode
        );

    }

    /**
     * Tìm tàu theo tuyến
     */
    getTrainByRoute(
        departure: string,
        destination: string
    ): RailwayTrain | undefined {

        return this.repository.findByRoute(
            departure,
            destination
        );

    }

    /**
     * Backward compatibility
     */
    getRoute(
        departure: string,
        destination: string
    ): RailwayTrain | undefined {

        return this.repository.findRoute(
            departure,
            destination
        );

    }

    /**
     * Thông tin tuyến
     */
    getRouteInfo(
        departure: string,
        destination: string
    ): RailwayRoute | undefined {

        return this.repository.findRouteInfo(
            departure,
            destination
        );

    }

    /**
     * Kiểm tra tuyến
     */
    hasRoute(
        departure: string,
        destination: string
    ): boolean {

        return this.repository.hasRoute(
            departure,
            destination
        );

    }

    /**
     * Khoảng cách tuyến
     */
    getDistance(
        departure: string,
        destination: string
    ): number {

        return this.repository.getDistance(
            departure,
            destination
        );

    }

}