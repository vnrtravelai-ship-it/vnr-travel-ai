/* ============================================================
 * VNR Travel AI
 * Template Matching Service
 * ------------------------------------------------------------
 * Sprint 5.4
 * Match PlanningRequest -> PlanningTemplate
 * ============================================================
 */

import { PlanningRequest }
from "../planning/models/planning-request.model";

import { PlanningTemplate }
from "../planning/templates/template.types";

import { TemplateRepository }
from "../repositories/template.repository";

export class TemplateMatchingService {

    private readonly repository: TemplateRepository;

    constructor(
        repository?: TemplateRepository
    ) {

        this.repository =
            repository ??
            new TemplateRepository();

    }

    /**
     * Match template from PlanningRequest.
     */
    match(
        request: PlanningRequest
    ): PlanningTemplate | undefined {

        return this.repository.findByRequest(
            request
        );

    }

    /**
     * Check whether a template exists.
     */
    hasTemplate(
        request: PlanningRequest
    ): boolean {

        return (
            this.match(request) !==
            undefined
        );

    }

}