import fs from "fs";
import path from "path";

import { BaseProvider }
from "../shared/base.provider";

import {
    FoodPlan
}
from "../../planning/models/planning-context.model";

export class FoodProvider
extends BaseProvider<FoodPlan> {

    private foods: FoodPlan[] = [];

    constructor() {

        super();

        const filePath =
            path.join(

                process.cwd(),

                "src/server/planning/data/foods.json"

            );

        const json =
            fs.readFileSync(

                filePath,

                "utf8"

            );

        this.foods =
            JSON.parse(json);

    }

    async load(): Promise<FoodPlan[]> {

        return this.foods;

    }

    findFood(

        location: string

    ): FoodPlan | undefined {

        return this.foods.find(food =>

            food.specialties.some(item =>

                item.toLowerCase().includes(

                    location.toLowerCase()

                )

            )

        );

    }

}