import { BaseProvider }
from "../shared/base.provider";

import {
    TourPlan
}
from "../../planning/models/planning-context.model";

import {
    TourDataSource
}
from "../../datasources/tour.datasource";

export class TourProvider
extends BaseProvider<TourPlan> {

    private readonly datasource =
        TourDataSource.getInstance();

    constructor() {

        super();

    }

    /**
     * Trả toàn bộ dữ liệu.
     */
    async load(): Promise<TourPlan[]> {

        return this.datasource.getAll();

    }

    /**
     * Tìm tour theo thành phố.
     */
    findByCity(
        city: string
    ): TourPlan[] {

        const keyword =
            city
                .trim()
                .toLowerCase();

        return this.datasource
            .getAll()
            .filter(

                tour =>

                    tour.city
                        ?.toLowerCase() === keyword

            );

    }

}