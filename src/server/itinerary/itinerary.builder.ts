import { PlanningContext }
from "../planning/models/planning-context.model";

import { DayPlan }
from "./models/day-plan.model";

export class ItineraryBuilder {

    async build(

        context: PlanningContext

    ): Promise<DayPlan[]> {

        return [];

    }

}