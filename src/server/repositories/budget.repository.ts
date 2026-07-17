import {
    BudgetPlan
}
from "../planning/models/planning-context.model";

export class BudgetRepository {

    calculate(

        railway: number,

        hotel: number,

        food: number,

        tours: number,

        transport: number = 0,

        miscellaneous: number = 0

    ): BudgetPlan {

        const total =

            railway +

            hotel +

            food +

            tours +

            transport +

            miscellaneous;

        return {

            railway,

            hotel,

            food,

            tours,

            transport,

            miscellaneous,

            total

        };

    }

}