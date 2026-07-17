import { TourProvider }
from "../providers/tour/tour.provider";

import {
    TourPlan
}
from "../planning/models/planning-context.model";

export class TourRepository {

    constructor(

        private provider: TourProvider

    ) {}

    findByCity(

        city: string

    ): TourPlan[] {

        return this.provider.findByCity(

            city

        );

    }

}