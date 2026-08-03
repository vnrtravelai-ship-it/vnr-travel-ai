import { BaseProvider }
from "../shared/base.provider";

import {
    BudgetPlan
}
from "../../planning/models/planning-context.model";

export class BudgetProvider
extends BaseProvider<BudgetPlan> {

    private readonly defaults: BudgetPlan[] = [

        {

            railway: 0,

            hotel: 0,

            food: 0,

            tours: 0,

            transport: 0,

            miscellaneous: 0,

            total: 0

        }

    ];

    /**
     * BudgetProvider hiện chưa có Data Source.
     * Sprint sau sẽ đọc Database/JSON.
     */
    async load(): Promise<BudgetPlan[]> {

        return this.defaults;

    }

    /**
     * Budget mặc định.
     */
    getDefaultBudget(): BudgetPlan {

        return this.defaults[0];

    }

}