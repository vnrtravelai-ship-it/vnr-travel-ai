import { PlanningRequest } from "./models/planning-request.model";
import { PlanningContext } from "./models/planning-context.model";

import { TemplateRepository } from "../repositories/template.repository";
import { RailwayPlanner } from "./planners/railway.planner";

import { PlanningCacheManager } from "../cache/managers/planning-cache.manager";

export class PlanningEngine {

    private cacheManager = new PlanningCacheManager();

    private templateRepository = new TemplateRepository();

    private railwayPlanner = new RailwayPlanner();

    async buildContext(
        request: PlanningRequest
    ): Promise<PlanningContext> {

        const cached =
            this.cacheManager.get(request);

        if (cached) {

            console.log("⚡ Cache Hit");

            return cached;

        }

        console.log("🆕 Cache Miss");

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

        const railwayContext =
            await this.railwayPlanner.plan(request);

        const context: PlanningContext = {

            request,

            railway: railwayContext,

            tours: [],

            metadata: {

                plannerVersion: "1.0.0",

                generatedAt: new Date(),

                locale: "vi-VN",

                currency: "VND",

            },

        };

        this.cacheManager.save(
            request,
            context
        );

        return context;

    }

}