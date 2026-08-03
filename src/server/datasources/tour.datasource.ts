/* ============================================================
 * VNR Travel AI
 * Tour Data Source
 * ------------------------------------------------------------
 * Single source of truth for tour JSON data.
 * Sprint 5.2
 * ============================================================
 */

import fs from "fs";
import path from "path";

import {
    TourPlan
} from "../planning/models/planning-context.model";

export class TourDataSource {

    private static instance: TourDataSource;

    private tours: TourPlan[] = [];

    private constructor() {

        this.tours = this.loadTours();

    }

    static getInstance(): TourDataSource {

        if (!TourDataSource.instance) {

            TourDataSource.instance =
                new TourDataSource();

        }

        return TourDataSource.instance;

    }

    /**
     * Load tours.json
     */
    private loadTours(): TourPlan[] {

        try {

            const filePath =
                path.join(

                    process.cwd(),

                    "src/server/planning/data/tours.json"

                );

            if (!fs.existsSync(filePath)) {

                console.warn(
                    "[TourDataSource] tours.json not found."
                );

                return [];

            }

            const json =
                fs.readFileSync(

                    filePath,

                    "utf8"

                );

            return JSON.parse(json) as TourPlan[];

        }

        catch (error) {

            console.error(
                "[TourDataSource] Failed to load tours:",
                error
            );

            return [];

        }

    }

    /**
     * Toàn bộ dữ liệu.
     */
    getAll(): TourPlan[] {

        return this.tours;

    }

    /**
     * Reload dữ liệu.
     */
    reload(): void {

        this.tours = this.loadTours();

    }

}