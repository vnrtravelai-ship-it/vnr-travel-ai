import { PlanningRequest } from "./models/planning-request.model";
import { PlanningContext } from "./models/planning-context.model";
import { TemplateRepository } from "../repositories/template.repository";
import { RailwayPlanner } from "./planners/railway.planner";
const templateRepository = new TemplateRepository();
export class PlanningEngine {
  private railwayPlanner = new RailwayPlanner();

  async buildContext( 
    
    request: PlanningRequest
  ): Promise<PlanningContext> {

    const railway = await this.railwayPlanner.plan(request);
    const template =
    templateRepository.findByRequest(request);

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