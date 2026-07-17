import { BaseProvider }
from "../shared/base.provider";

import {
    BudgetPlan
}
from "../../planning/models/planning-context.model";

export class BudgetProvider
extends BaseProvider<BudgetPlan> {

    async load(): Promise<BudgetPlan[]> {

        return [];

    }

}