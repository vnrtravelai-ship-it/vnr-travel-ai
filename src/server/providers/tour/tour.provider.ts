import fs from "fs";
import path from "path";

import { BaseProvider }
from "../shared/base.provider";

import {
    TourPlan
}
from "../../planning/models/planning-context.model";

export class TourProvider
extends BaseProvider<TourPlan> {

    private tours: TourPlan[] = [];

    constructor() {

        super();

        const filePath =
            path.join(

                process.cwd(),

                "src/server/planning/data/tours.json"

            );

        const json =
            fs.readFileSync(

                filePath,

                "utf8"

            );

        this.tours =
            JSON.parse(json);

    }

    async load(): Promise<TourPlan[]> {

        return this.tours;

    }

    findByCity(

        city: string

    ): TourPlan[] {

        return this.tours.filter(

            tour =>

                tour.city.toLowerCase() ===

                city.toLowerCase()

        );

    }

}