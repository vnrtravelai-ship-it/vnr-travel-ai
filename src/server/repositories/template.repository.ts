import { buildPlanningSignature } from "../planning/utils/planning-signature";
import { PlanningRequest } from "../planning/models/planning-request.model";
import { TemplateLoader } from "../planning/templates/template.loader";
const loader = new TemplateLoader();
export interface PlanningTemplate {
    id: string;
    departure: string;
    destination: string;
    days: number;
    budgetLevel: string;
    travelStyle: string;
    fileName: string;
}

export class TemplateRepository {

    private templates: PlanningTemplate[] = loader.load();

    getAll() {
        return this.templates;
    }

    findByRequest(request: PlanningRequest) {

        const signature = buildPlanningSignature(request);

        return this.templates.find((t) =>

            buildPlanningSignature({

                departure: t.departure,

                destination: t.destination,

                numberOfDays: t.days,

                adults: 1,

                children: 0,

                budgetLevel: t.budgetLevel,

                travelStyle: t.travelStyle,

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
    ) {

        return this.templates.find((t) =>

            t.departure === departure &&
            t.destination === destination &&
            t.days === days &&
            t.budgetLevel === budgetLevel &&
            t.travelStyle === travelStyle

        );

    }
}