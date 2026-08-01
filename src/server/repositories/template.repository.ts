import { BaseRepository } from "./base.repository";

import { PlanningTemplate }
from "../planning/templates/template.types";

import { planningTemplates }
from "../planning/templates/template.index";

import { PlanningRequest }
from "../planning/models/planning-request.model";

export class TemplateRepository
extends BaseRepository<PlanningTemplate> {

    constructor() {

        super(planningTemplates);

    }

    /**
     * Find template by PlanningRequest
     */
    findByRequest(
        request: PlanningRequest
    ): PlanningTemplate | undefined {

        return this.findOne(template =>

            template.departure === request.departure &&

            template.destination === request.destination &&

            template.days === request.numberOfDays &&

            template.budgetLevel ===
                (request.budgetLevel ?? "") &&

            template.travelStyle ===
                (request.travelStyle ?? "")

        );

    }

}