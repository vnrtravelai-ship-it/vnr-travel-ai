import { ScheduleSlot }
from "../models/schedule-slot.model";

export class DistanceRule {

    optimize(
        schedule: ScheduleSlot[]
    ): ScheduleSlot[] {

        if (schedule.length <= 1) {
            return [...schedule];
        }

        const result =
            [...schedule].sort(
                (a, b) => {

                    const timeComparison =
                        a.startTime.localeCompare(
                            b.startTime
                        );

                    if (timeComparison !== 0) {
                        return timeComparison;
                    }

                    if (a.locked !== b.locked) {
                        return a.locked ? -1 : 1;
                    }

                    return a.order - b.order;
                }
            );

        result.forEach(
            (slot, index) => {
                slot.order = index + 1;
            }
        );

        return result;
    }
}