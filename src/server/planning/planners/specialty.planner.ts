import { PlanningContext } from "../models/planning-context.model";

export class SpecialtyPlanner {

    async plan(
        context: PlanningContext
    ): Promise<string[]> {

        /**
         * Sprint 4.9
         *
         * Planner chỉ tổng hợp danh sách
         * đặc sản đã được Food Planner
         * chuẩn bị trong PlanningContext.
         *
         * Sprint 5.x sẽ bổ sung:
         * - Seasonal Recommendation
         * - AI Recommendation
         * - Local Ranking
         */

        return [

            ...(context.food?.specialties ?? [])

        ];

    }

}