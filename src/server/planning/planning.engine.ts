import { PlanningRequest } from "./models/planning-request.model";
import { PlanningContext } from "./models/planning-context.model";

import { TemplateRepository } from "../repositories/template.repository";

import { PlanningCacheManager } from "../cache/managers/planning-cache.manager";
import { KnowledgeRepository } from "../knowledge/knowledge.repository";

export class PlanningEngine {

    private cacheManager = new PlanningCacheManager();

    private templateRepository = new TemplateRepository();

    private knowledge = new KnowledgeRepository();

    async buildContext(
        request: PlanningRequest
    ): Promise<PlanningContext> {

        // ===============================
        // 1. CACHE
        // ===============================

        const cached = this.cacheManager.get(request);

        if (cached) {

            console.log("⚡ Cache Hit");

            return cached;

        }

        console.log("🆕 Cache Miss");

        // ===============================
        // 2. TEMPLATE
        // ===============================

        const template =
            this.templateRepository.findByRequest(request);

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
            await this.knowledge
                .railwayServiceInstance()
                .plan(request);

        const hotelContext =
            await this.knowledge
                .hotelServiceInstance()
                .plan(request);

        const foodContext =
            await this.knowledge
                .foodServiceInstance()
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

        this.cacheManager.save(
            request,
            context
        );

        return context;

    }

}