import {
    PlanningContext
} from "../planning/models/planning-context.model";

import {
    PlanningTemplate
} from "../planning/templates/template.types";

export class HybridPlanningService {

    merge(

        context: PlanningContext,

        template?: PlanningTemplate

    ): PlanningContext {

        if (!template) {

            return context;

        }

        return {

            ...context

        };

    }

}