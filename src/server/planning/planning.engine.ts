import { PlanningRequest } from "./models/planning-request.model";

import {
    PlanningContext,
    PlanningMetadata
} from "./models/planning-context.model";

import { ApplicationContainer }
from "../core/application.container";

export class PlanningEngine {

    private container =
        ApplicationContainer.getInstance();

    async buildContext(
        request: PlanningRequest
    ): Promise<PlanningContext> {

        // =====================================
        // 1. CACHE
        // =====================================

        const cached =
            this.container
                .cacheManager
                .get(request);

        if (cached) {

            console.log("⚡ Cache Hit");

            return cached;

        }

        console.log("🆕 Cache Miss");

        // =====================================
        // 2. TEMPLATE
        // =====================================

        const template =
            this.container
                .templateRepository
                .findByRequest(request);

        if (template) {

            console.log(
                "✔ Planning Template Found:",
                template.id
            );

        } else {

            console.log(
                "✖ No Template - Using Planners"
            );

        }

        // =====================================
        // 3. KNOWLEDGE
        // =====================================

        const railway =
            await this.container
                .knowledgeRepository
                .railwayService
                .plan(request);

        const hotel =
            await this.container
                .knowledgeRepository
                .hotelService
                .plan(request);

        const food =
            await this.container
                .knowledgeRepository
                .foodService
                .plan(request);

        const tours =
            await this.container
                .knowledgeRepository
                .tourService
                .plan(request);

        // =====================================
        // 4. METADATA
        // =====================================

        const metadata: PlanningMetadata = {

            plannerVersion: "3.6.0",

            generatedAt: new Date(),

            locale: "vi-VN",

            currency: "VND",

            aiProvider: "PlanningEngine",

            model: "RuleEngine"

        };

        // =====================================
        // 5. BUILD PARTIAL CONTEXT
        // =====================================

        const partialContext: PlanningContext = {

            request,

            railway,

            hotel,

            food,

            tours,

            itinerary: [],

            budget: undefined,

            affiliate: undefined,

            metadata

        };

        // =====================================
        // 6. BUDGET
        // =====================================

        const budget =
            await this.container
                .knowledgeRepository
                .budgetService
                .plan(partialContext);

        // =====================================
        // 7. AFFILIATE
        // =====================================

        const affiliate =
            await this.container
                .knowledgeRepository
                .affiliateService
                .plan(partialContext);

        // =====================================
        // 8. FINAL CONTEXT
        // =====================================

        const context: PlanningContext = {

            ...partialContext,

            budget,

            affiliate

        };

        // =====================================
        // 9. SAVE CACHE
        // =====================================

        this.container
            .cacheManager
            .save(
                request,
                context
            );

        return context;

    }

}