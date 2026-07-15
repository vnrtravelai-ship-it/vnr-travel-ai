import { buildPlanningSignature } from "../planning/utils/planning-signature";
import { PlanningRequest } from "../planning/models/planning-request.model";

import { TemplateLoader } from "../planning/templates/template.loader";
import { PlanningTemplate } from "../planning/templates/template.types";

export class TemplateRepository {

    private loader =
    TemplateLoader.getInstance();

private templates =
    this.loader.getTemplates();

    getAll(): PlanningTemplate[] {

        return this.templates;

    }

    findByRequest(
        request: PlanningRequest
    ): PlanningTemplate | undefined {

        const signature =
            buildPlanningSignature(request);

        return this.templates.find((template) =>

            buildPlanningSignature({

                departure: template.departure,

                destination: template.destination,

                numberOfDays: template.days,

                adults: 1,

                children: 0,

                budgetLevel: template.budgetLevel,

                travelStyle: template.travelStyle,

                companion: "",

            }) === signature

        );

    }

    find(
        departure: string,
        destination: string,
        days: number,
        budgetLevel: string,
        travelStyle: string
    ): PlanningTemplate | undefined {

        return this.templates.find((template) =>

            template.departure === departure &&
            template.destination === destination &&
            template.days === days &&
            template.budgetLevel === budgetLevel &&
            template.travelStyle === travelStyle

        );

    }

}