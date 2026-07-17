import { ScheduleSlot } from "../models/schedule-slot.model";

export class DistanceRule {

    optimize(
        schedule: ScheduleSlot[]
    ): ScheduleSlot[] {

        const fixed =
            schedule.filter(
                x => x.locked
            );

        const movable =
            schedule.filter(
                x => !x.locked
            );

        movable.sort((a, b) => {

            // =====================================
            // 1. Latitude
            // =====================================

            if (
                a.latitude !== undefined &&
                b.latitude !== undefined &&
                a.latitude !== b.latitude
            ) {

                return a.latitude - b.latitude;

            }

            // =====================================
            // 2. Longitude
            // =====================================

            if (
                a.longitude !== undefined &&
                b.longitude !== undefined &&
                a.longitude !== b.longitude
            ) {

                return a.longitude - b.longitude;

            }

            // =====================================
            // 3. Start Time
            // =====================================

            return a.startTime.localeCompare(
                b.startTime
            );

        });

        const result = [

            ...fixed,

            ...movable

        ];

        result.forEach((item, index) => {

            item.order = index + 1;

        });

        return result;

    }

}