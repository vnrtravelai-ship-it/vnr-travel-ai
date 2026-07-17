import { PlanningContext } from "../../planning/models/planning-context.model";
import { ScheduleSlot } from "../models/schedule-slot.model";

export class MealRule {

    apply(
        context: PlanningContext,
        schedule: ScheduleSlot[]
    ): ScheduleSlot[] {

        let order =
            schedule.length + 1;

        if (context.food?.breakfast) {

            schedule.push({

                id: "breakfast",

                day: 1,

                type: "BREAKFAST",

                title: context.food.breakfast,

                startTime: "07:00",

                endTime: "08:00",

                durationMinutes: 60,

                order: order++,

                locked: false

            });

        }

        if (context.food?.lunch) {

            schedule.push({

                id: "lunch",

                day: 1,

                type: "LUNCH",

                title: context.food.lunch,

                startTime: "12:00",

                endTime: "13:00",

                durationMinutes: 60,

                order: order++,

                locked: false

            });

        }

        if (context.food?.dinner) {

            schedule.push({

                id: "dinner",

                day: 1,

                type: "DINNER",

                title: context.food.dinner,

                startTime: "18:00",

                endTime: "19:30",

                durationMinutes: 90,

                order: order++,

                locked: false

            });

        }

        if (context.food?.coffee) {

            schedule.push({

                id: "coffee",

                day: 1,

                type: "COFFEE",

                title: context.food.coffee,

                startTime: "15:00",

                endTime: "15:30",

                durationMinutes: 30,

                order: order++,

                locked: false

            });

        }

        return schedule;

    }

}