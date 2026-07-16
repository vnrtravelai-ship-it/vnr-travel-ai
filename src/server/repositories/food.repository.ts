import { FoodProvider }
from "../providers/food/food.provider";

import {
    FoodPlan
} from "../planning/models/planning-context.model";

export class FoodRepository {

    constructor(

        private provider: FoodProvider

    ) { }

    findFood(

        location: string

    ): FoodPlan | undefined {

        return this.provider.findFood(

            location

        );

    }

}