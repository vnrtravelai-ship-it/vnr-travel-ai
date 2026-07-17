import { BaseService }
from "./base.service";

import {
    PlanningContext,
    AffiliatePlan
}
from "../../planning/models/planning-context.model";

import {
    AffiliateRepository
}
from "../../repositories/affiliate.repository";

export class AffiliateService
extends BaseService<PlanningContext, AffiliatePlan> {

    constructor(

        private repository: AffiliateRepository

    ) {

        super();

    }

    async plan(

        context: PlanningContext

    ): Promise<AffiliatePlan> {

        return this.repository.buildLinks();

    }

}