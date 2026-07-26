import {
    PlanningContext,
    BudgetPlan
} from "../models/planning-context.model";

export class BudgetPlanner {

    async plan(
        context: PlanningContext
    ): Promise<BudgetPlan> {

        const railway =
            context.railway?.estimatedPrice ?? 0;

        const hotel =
            context.hotel?.selectedHotel?.priceFrom ?? 0;

        const food =
            context.food?.specialties?.length
                ? context.food.specialties.length * 50000
                : 0;

        const tours =
            context.tours.reduce(

                (sum, tour) =>

                    sum + tour.estimatedPrice,

                0

            );

        const transport = 0;

        const miscellaneous = 0;

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