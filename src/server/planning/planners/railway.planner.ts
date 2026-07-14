import { PlanningRequest } from "../models/planning-request.model";
import { RailwayPlan } from "../models/planning-context.model";
import { RailwayRepository } from "../../repositories/railway.repository";

const repository = new RailwayRepository();

export class RailwayPlanner {
  async plan(
    request: PlanningRequest
  ): Promise<RailwayPlan> {

    const route = repository.findRoute(
    request.departure,
    request.destination
);

    const train = repository.findTrain(
    request.departure,
    request.destination
);

    return {
      trainCode: train?.trainCode ?? "",

      departureStation: request.departure,

      arrivalStation: request.destination,

      departureTime: train?.departureTime ?? "",

      arrivalTime: train?.arrivalTime ?? "",

      seatType: train?.seatTypes[0] ?? "",

      estimatedPrice: train?.estimatedPrice ?? 0,

      duration: train?.duration ?? "",

      distanceKm: route?.distanceKm ?? 0,
    };
  }
}