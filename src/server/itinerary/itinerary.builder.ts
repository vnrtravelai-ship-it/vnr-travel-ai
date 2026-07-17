import { PlanningContext }
from "../planning/models/planning-context.model";

import { DayPlan }
from "./models/day-plan.model";

import { SchedulerService }
from "../knowledge/services/scheduler.service";

export class ItineraryBuilder {

    private readonly scheduler =
        new SchedulerService();

    async build(

        context: PlanningContext

    ): Promise<DayPlan[]> {

        const itinerary =
            await this.scheduler
                .plan(context);

        return itinerary;

    }

}