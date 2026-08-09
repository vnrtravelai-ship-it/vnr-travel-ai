import { BaseRepository }
from "./base.repository";

import {
    FoodPlan
}
from "../planning/models/planning-context.model";

import {
    FoodDataSource
}
from "../datasources/food.datasource";

type FoodRecord =
    FoodPlan & {
        city: string;
    };

export class FoodRepository
extends BaseRepository<FoodRecord> {

    private readonly datasource:
        FoodDataSource;

    constructor() {

        const datasource =
            FoodDataSource.getInstance();

        const foods =
            datasource.getAll().map(
                food =>
                    food as FoodRecord
            );

        super(foods);

        this.datasource =
            datasource;

    }

    findFood(
        location: string
    ): FoodPlan | undefined {

        const normalizedLocation =
            location
                .trim()
                .toLowerCase();

        const food =
            this.findOne(
                item =>
                    item.city
                        .trim()
                        .toLowerCase()
                        === normalizedLocation
            );

        return food;

    }

}