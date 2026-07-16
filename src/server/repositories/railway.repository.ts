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

    /**
     * Tìm tuyến đường theo ga đi và ga đến
     */
    findRoute(
        departure: string,
        arrival: string
    ): RailwayRoute | undefined {

        return this.routes.find(
            (route) =>
                route.departure === departure &&
                route.arrival === arrival
        );

    }

    /**
     * Alias cho tương lai.
     * Hiện tại Route đã chứa luôn thông tin tàu.
     * Sau này khi tách TrainRepository,
     * chỉ cần sửa hàm này mà không phải sửa Service.
     */
    findTrain(
        departure: string,
        arrival: string
    ): RailwayRoute | undefined {

        return this.findRoute(
            departure,
            arrival
        );

    }

    /**
     * Trả toàn bộ dữ liệu
     */
    getAll(): RailwayRoute[] {

        return this.routes;

    }

}