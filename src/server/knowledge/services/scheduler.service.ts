import { PlanningContext } from "../../planning/models/planning-context.model";

import { DayPlan } from "../../itinerary/models/day-plan.model";
import { Activity } from "../../itinerary/models/activity.model";

import { SchedulerEngine } from "../../scheduler/scheduler.engine";
import {
    ScheduleSlot,
    ScheduleType
} from "../../scheduler/models/schedule-slot.model";

export class SchedulerService {

    private readonly engine =
        new SchedulerEngine();

    async plan(
        context: PlanningContext
    ): Promise<DayPlan[]> {

        const slots =
            this.engine.build(context);

        if (slots.length === 0) {

            return [];

        }

        const grouped =
            new Map<number, ScheduleSlot[]>();

        for (const slot of slots) {

            if (!grouped.has(slot.day)) {

                grouped.set(slot.day, []);

            }

            grouped.get(slot.day)!.push(slot);

        }

        const result: DayPlan[] = [];

        const days =
            [...grouped.keys()]
                .sort((a, b) => a - b);

        for (const day of days) {

            const daySlots =
                grouped.get(day)!
                    .sort((a, b) => a.order - b.order);

            result.push({

                day,

                title: `Ngày ${day}`,

                activities:
                    daySlots.map(slot =>
                        this.toActivity(slot)
                    )

            });

        }

        return result;

    }

    // =====================================
    // Mapping
    // =====================================

    private toActivity(
        slot: ScheduleSlot
    ): Activity {

        return {

            startTime:
                slot.startTime,

            endTime:
                slot.endTime,

            title:
                slot.title,

            description:
                slot.description ?? "",

            category:
                this.resolveCategory(slot.type),

            location:
                slot.location,

            estimatedCost:
                slot.estimatedCost

        };

    }

    // =====================================
    // ScheduleType -> Activity Category
    // =====================================

    private resolveCategory(
        type: ScheduleType
    ): Activity["category"] {

        switch (type) {

            case "TRAIN":
                return "railway";

            case "HOTEL":
                return "hotel";

            case "BREAKFAST":
            case "LUNCH":
            case "DINNER":
            case "COFFEE":
                return "food";

            case "TOUR":
                return "tour";

            case "TRANSPORT":
                return "transport";

            case "FREE_TIME":
            default:
                return "free";

        }

    }

}