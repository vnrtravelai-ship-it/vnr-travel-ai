import { BaseRepository } from "./base.repository";

import {
    FoodPlan
} from "../planning/models/planning-context.model";

export class FoodRepository
    extends BaseRepository<FoodPlan> {

    constructor() {

        super([]);

    }

    findFood(

        location: string

    ): FoodPlan | undefined {

        return this.findOne(

            () => true

        );

    }

}