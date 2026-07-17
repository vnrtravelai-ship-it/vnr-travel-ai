import { PlanningContext } from "../planning/models/planning-context.model";

import { ScheduleSlot } from "./models/schedule-slot.model";

import { TrainArrivalRule } from "./rules/train-arrival.rule";
import { HotelCheckinRule } from "./rules/hotel-checkin.rule";
import { MealRule } from "./rules/meal.rule";
import { OpenHourRule } from "./rules/open-hour.rule";
import { DistanceRule } from "./rules/distance.rule";

export class SchedulerEngine {

    private readonly trainRule =
        new TrainArrivalRule();

    private readonly hotelRule =
        new HotelCheckinRule();

    private readonly mealRule =
        new MealRule();

    private readonly openHourRule =
        new OpenHourRule();

    private readonly distanceRule =
        new DistanceRule();

    build(
        context: PlanningContext
    ): ScheduleSlot[] {

        let schedule: ScheduleSlot[] = [];

        // =====================================
        // 1. TRAIN ARRIVAL
        // =====================================

        schedule =
            this.trainRule.apply(
                context,
                schedule
            );

        // =====================================
        // 2. HOTEL CHECK-IN
        // =====================================

        schedule =
            this.hotelRule.apply(
                context,
                schedule
            );

        // =====================================
        // 3. MEALS
        // =====================================

        schedule =
            this.mealRule.apply(
                context,
                schedule
            );

        // =====================================
        // 4. TOURS / OPEN HOURS
        // =====================================

        schedule =
            this.openHourRule.apply(
                context,
                schedule
            );

        // =====================================
        // 5. ROUTE OPTIMIZATION
        // =====================================

        schedule =
            this.distanceRule.optimize(
                schedule
            );

        // =====================================
        // 6. FINAL SORT
        // =====================================

        schedule.sort(
            (a, b) => {

                if (a.day !== b.day) {

                    return a.day - b.day;

                }

                return a.order - b.order;

            }
        );

        return schedule;

    }

}