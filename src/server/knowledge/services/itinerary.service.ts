import { PlanningContext } from "../../planning/models/planning-context.model";
import { DayPlan } from "../../itinerary/models/day-plan.model";
import { ItineraryBuilder } from "../../itinerary/itinerary.builder";

export class ItineraryService {

    private readonly builder =
        new ItineraryBuilder();

    async plan(
        context: PlanningContext
    ): Promise<DayPlan[]> {

        console.log(
            "🗓 Building itinerary..."
        );

        return await this.builder.build(
            context
        );

    }

}