import { PlanningContext } from "../../planning/models/planning-context.model";
import { ScheduleSlot } from "../models/schedule-slot.model";

export class MealRule {
    apply(
        context: PlanningContext,
        schedule: ScheduleSlot[]
    ): ScheduleSlot[] {
        if (!context.food) {
            return schedule;
        }

        const numberOfDays = Math.max(
            1,
            context.request.numberOfDays
        );

        let order = schedule.length + 1;

        for (let day = 1; day <= numberOfDays; day++) {
            if (context.food.breakfast) {
                schedule.push({
                    id: `breakfast-day-${day}`,
                    day,
                    type: "BREAKFAST",
                    title: context.food.breakfast,
                    startTime: "07:00",
                    endTime: "08:00",
                    durationMinutes: 60,
                    order: order++,
                    locked: false
                });
            }

            if (context.food.lunch) {
                schedule.push({
                    id: `lunch-day-${day}`,
                    day,
                    type: "LUNCH",
                    title: context.food.lunch,
                    startTime: "12:00",
                    endTime: "13:00",
                    durationMinutes: 60,
                    order: order++,
                    locked: false
                });
            }

            if (context.food.coffee) {
                schedule.push({
                    id: `coffee-day-${day}`,
                    day,
                    type: "COFFEE",
                    title: context.food.coffee,
                    startTime: "15:00",
                    endTime: "15:30",
                    durationMinutes: 30,
                    order: order++,
                    locked: false
                });
            }

            if (context.food.dinner) {
                schedule.push({
                    id: `dinner-day-${day}`,
                    day,
                    type: "DINNER",
                    title: context.food.dinner,
                    startTime: "18:00",
                    endTime: "19:30",
                    durationMinutes: 90,
                    order: order++,
                    locked: false
                });
            }
        }

        return schedule;
    }
}