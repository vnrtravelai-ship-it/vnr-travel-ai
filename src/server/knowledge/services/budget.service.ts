import { BaseService }
from "./base.service";

import {
    PlanningRequest
}
from "../../planning/models/planning-request.model";

import {
    PlanningContext,
    BudgetPlan
}
from "../../planning/models/planning-context.model";

import {
    BudgetRepository
}
from "../../repositories/budget.repository";

export class BudgetService
extends BaseService<PlanningContext, BudgetPlan> {

    constructor(

        private repository: BudgetRepository

    ) {

        super();

    }

    async plan(

        context: PlanningContext

    ): Promise<BudgetPlan> {

        const railway =

            context.railway?.estimatedPrice ?? 0;

        const hotel =

            context.hotel?.selectedHotel?.priceFrom ?? 0;

        const food = 300000;

        const tours =

            context.tours.reduce(

                (sum, tour) =>

                    sum + tour.estimatedPrice,

                0

            );

        return this.repository.calculate(

            railway,

            hotel,

            food,

            tours,

            0,

            0

        );

    }

}