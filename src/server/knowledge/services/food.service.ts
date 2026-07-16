import { BaseService } from "./base.service";

import { PlanningRequest } from "../../planning/models/planning-request.model";

import { FoodPlan } from "../../planning/models/planning-context.model";

import { FoodRepository } from "../../repositories/food.repository";

export class FoodService
    extends BaseService<PlanningRequest, FoodPlan> {

    constructor(
        private repository: FoodRepository
    ) {
        super();
    }

    async plan(
        request: PlanningRequest
    ): Promise<FoodPlan> {

        const food = this.repository.findByCity(
            request.destination
        );

        return {

            breakfast: food?.breakfast,

            lunch: food?.lunch,

            dinner: food?.dinner,

            coffee: food?.coffee,

            specialties: food?.specialties ?? [],

        };

    }

}