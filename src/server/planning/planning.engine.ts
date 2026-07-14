import { PlanningRequest } from "./models/planning-request.model";
import { PlanningContext } from "./models/planning-context.model";

import { TemplateRepository } from "../repositories/template.repository";

import { RailwayPlanner } from "./planners/railway.planner";

export class PlanningEngine {

    private templateRepository = new TemplateRepository();

    private railwayPlanner = new RailwayPlanner();

    async buildContext(
        request: PlanningRequest
    ): Promise<PlanningContext> {

        // Kiểm tra Template trước
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

        // Hiện tại vẫn luôn chạy Planner.
        // Ở Phase 4 nếu Template đầy đủ sẽ return ngay tại đây.
        const railwayContext =
            await this.railwayPlanner.plan(request);

        return {

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

    }

}