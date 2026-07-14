import { PlanningRequest } from "./models/planning-request.model";
import { PlanningContext } from "./models/planning-context.model";

import { RailwayPlanner } from "./planners/railway.planner";

export class PlanningEngine {
  private railwayPlanner = new RailwayPlanner();

  async buildContext(
    request: PlanningRequest
  ): Promise<PlanningContext> {

    const railway = await this.railwayPlanner.plan(request);

    return {
      request,

      railway,

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