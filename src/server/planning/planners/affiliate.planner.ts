import {
    AffiliatePlan,
    PlanningContext
} from "../models/planning-context.model";

export class AffiliatePlanner {

    async plan(
        context: PlanningContext
    ): Promise<AffiliatePlan> {

        return {

            railway:
                context.railway
                    ? "https://www.baolau.com/?source=vnrailway"
                    : undefined,

            hotel:
                context.hotel?.selectedHotel
                    ? context.hotel.selectedHotel.affiliateUrl
                    : undefined,

            tour:
                context.tours.length > 0
                    ? context.tours[0].affiliateUrl
                    : undefined,

            flight: undefined,

            bus: undefined,

            insurance: undefined

        };

    }

}