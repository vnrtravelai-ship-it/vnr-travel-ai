import { PlanningRequest } from "../models/planning-request.model";

import {
    FoodPlan
} from "../models/planning-context.model";

import {
    FoodRepository
} from "../../repositories/food.repository";

export class FoodPlanner {

    constructor(

        private readonly repository: FoodRepository

    ) {}

    async plan(
        request: PlanningRequest
    ): Promise<FoodPlan> {

        const food =
            this.repository.findFood(

                request.destination

            );

        return {

            breakfast:
                food?.breakfast,

            lunch:
                food?.lunch,

            dinner:
                food?.dinner,

            coffee:
                food?.coffee,

            specialties:
                food?.specialties ?? []

        };

    }

}