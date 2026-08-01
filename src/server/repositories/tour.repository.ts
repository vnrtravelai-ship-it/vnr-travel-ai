import { BaseRepository } from "./base.repository";

import {
    TourPlan
} from "../planning/models/planning-context.model";

export class TourRepository
    extends BaseRepository<TourPlan> {

    constructor() {

        super([]);

    }

    findByCity(

        city: string

    ): TourPlan[] {

        return this.findMany(

            tour =>

                tour.city === city

        );

    }

    findByCategory(

        category: string

    ): TourPlan[] {

        return this.findMany(

            tour =>

                tour.category === category

        );

    }

    findById(

        id: string

    ): TourPlan | undefined {

        return this.findOne(

            tour =>

                tour.id === id

        );

    }

}