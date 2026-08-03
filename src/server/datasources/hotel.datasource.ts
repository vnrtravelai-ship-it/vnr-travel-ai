/* ============================================================
 * VNR Travel AI
 * Hotel Data Source
 * ------------------------------------------------------------
 * Single source of truth for hotel JSON data.
 * Sprint 5.2
 * ============================================================
 */

import fs from "fs";
import path from "path";

import {
    HotelSummary
} from "../planning/models/planning-context.model";

export class HotelDataSource {

    private static instance: HotelDataSource;

    private hotels: HotelSummary[] = [];

    private constructor() {

        this.hotels = this.loadHotels();

    }

    static getInstance(): HotelDataSource {

        if (!HotelDataSource.instance) {

            HotelDataSource.instance =
                new HotelDataSource();

        }

        return HotelDataSource.instance;

    }

    /**
     * Đọc dữ liệu từ hotels.json
     */
    private loadHotels(): HotelSummary[] {

        try {

            const filePath =
                path.join(

                    process.cwd(),

                    "src/server/planning/data/hotels.json"

                );

            if (!fs.existsSync(filePath)) {

                console.warn(
                    "[HotelDataSource] hotels.json not found."
                );

                return [];

            }

            const json =
                fs.readFileSync(

                    filePath,

                    "utf8"

                );

            return JSON.parse(json) as HotelSummary[];

        }

        catch (error) {

            console.error(
                "[HotelDataSource] Failed to load hotels:",
                error
            );

            return [];

        }

    }

    /**
     * Toàn bộ dữ liệu khách sạn.
     */
    getAll(): HotelSummary[] {

        return this.hotels;

    }

    /**
     * Reload dữ liệu từ JSON.
     */
    reload(): void {

        this.hotels = this.loadHotels();

    }

}