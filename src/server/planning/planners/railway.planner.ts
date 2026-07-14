import { PlanningRequest } from "../models/planning-request.model";
import { RailwayPlan } from "../models/planning-context.model";

export class RailwayPlanner {
  async plan(request: PlanningRequest): Promise<RailwayPlan> {
    return {
      trainCode: "",
      departureStation: request.departure,
      arrivalStation: request.destination,
      departureTime: "",
      arrivalTime: "",
      seatType: "",
      estimatedPrice: 0,
      duration: "",
    };
  }
}