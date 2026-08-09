import fs from "fs";
import path from "path";

import { TourPlan } from "../planning/models/planning-context.model";

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

        } catch (error) {

            console.error(
                "[TourDataSource] Failed to load tours:",
                error
            );

            return [];
        }
    }

    getAll(): TourPlan[] {
        return this.tours;
    }

    findById(
        id: string
    ): TourPlan | undefined {

        return this.tours.find(
            tour => tour.id === id
        );
    }

    findByCity(
        city: string
    ): TourPlan[] {

        return this.tours.filter(
            tour => tour.city === city
        );
    }

    findByCategory(
        category: string
    ): TourPlan[] {

        return this.tours.filter(
            tour => tour.category === category
        );
    }

    reload(): void {
        this.tours = this.loadTours();
    }
}
