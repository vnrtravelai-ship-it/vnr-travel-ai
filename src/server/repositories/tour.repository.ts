import { BaseRepository } from "./base.repository";

import {
    TourPlan
} from "../planning/models/planning-context.model";

import {
    TourDataSource
} from "../datasources/tour.datasource";

export class TourRepository
extends BaseRepository<TourPlan> {

    private readonly datasource: TourDataSource;

    constructor() {

        const datasource =
            TourDataSource.getInstance();

        super(
            datasource.getAll()
        );

        this.datasource = datasource;
    }

    findAllTours(): TourPlan[] {

        return this.findAll();
    }

    findByCity(
        city: string
    ): TourPlan[] {

        return this.datasource.findByCity(
            city
        );
    }

    findByCategory(
        category: string
    ): TourPlan[] {

        return this.datasource.findByCategory(
            category
        );
    }

    findById(
        id: string
    ): TourPlan | undefined {

        return this.datasource.findById(
            id
        );
    }

}
