import { PlanningRequest } from "./models/planning-request.model";
import { PlanningContext } from "./models/planning-context.model";

import { ApplicationContainer } from "../core/application.container";

export class PlanningEngine {

    private container =
        ApplicationContainer.getInstance();

    async buildContext(
        request: PlanningRequest
    ): Promise<PlanningContext> {

        // ===============================
        // 1. CACHE
        // ===============================

        const cached =
            this.container
                .cacheManager
                .get(request);

        if (cached) {

            console.log("⚡ Cache Hit");

            return cached;

        }

        console.log("🆕 Cache Miss");

        // ===============================
        // 2. TEMPLATE
        // ===============================

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

        // ===============================
        // 3. KNOWLEDGE SERVICES
        // ===============================

        const railwayContext =
            await this.container
                .knowledgeRepository
                .railwayService
                .plan(request);

        const hotelContext =
            await this.container
                .knowledgeRepository
                .hotelService
                .plan(request);

        const foodContext =
            await this.container
                .knowledgeRepository
                .foodService
                .plan(request);

        // ===============================
        // 4. BUILD CONTEXT
        // ===============================

        const context: PlanningContext = {

            request,

            railway: railwayContext,

            hotel: hotelContext,

            food: foodContext,

            tours: [],

            budget: undefined,

            affiliate: undefined,

            metadata: {

                plannerVersion: "1.0.0",

                generatedAt: new Date(),

                locale: "vi-VN",

                currency: "VND",

            },

        };

        // ===============================
        // 5. SAVE CACHE
        // ===============================

        this.container
            .cacheManager
            .save(
                request,
                context
            );

        return context;

    }

}