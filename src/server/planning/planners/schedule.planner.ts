import { PlanningContext } from "../models/planning-context.model";

import { DayPlan } from "../../itinerary/models/day-plan.model";

export class SchedulePlanner {

    async plan(
        context: PlanningContext
    ): Promise<DayPlan[]> {

        /**
         * Sprint 4.9
         * Schedule Planner chỉ chịu trách nhiệm
         * trả về lịch trình đã được tạo.
         *
         * Việc tối ưu timeline sẽ được thực hiện
         * ở Sprint 5.x (Optimizer).
         */

        return context.itinerary;

    }

}