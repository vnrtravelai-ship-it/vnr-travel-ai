import { BaseProvider }
from "../shared/base.provider";

import {
    FoodPlan
}
from "../../planning/models/planning-context.model";

import {
    FoodDataSource
}
from "../../datasources/food.datasource";

export class FoodProvider
extends BaseProvider<FoodPlan> {

    private readonly datasource =
        FoodDataSource.getInstance();

    constructor() {

        super();

    }

    /**
     * Trả toàn bộ dữ liệu.
     */
    async load(): Promise<FoodPlan[]> {

        return this.datasource.getAll();

    }

    /**
     * Tìm dữ liệu ẩm thực theo địa điểm.
     */
    findFood(
        location: string
    ): FoodPlan | undefined {

        const keyword =
            location
                .trim()
                .toLowerCase();

        return this.datasource
            .getAll()
            .find(food =>

                (food.specialties ?? []).some(item =>

                    item
                        .toLowerCase()
                        .includes(keyword)

                )

            );

    }

}